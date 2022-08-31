import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { thunkGetOneItem } from '../../store/items';
import { thunkGetReviews } from '../../store/reviews';
import { thunkGetCartProducts } from '../../store/cart';
import { thunkGetLists } from '../../store/lists';
import { thunkAddItemToList } from '../../store/lists';
import Reviews from '../Reviews/Reviews';
import './singleitem.css'

const SingleItem = () => {
    const { itemId } = useParams();
    const item = useSelector(state => state.allItems[itemId]);
    const userId = useSelector(state => state.session?.user?.id);
    const user = useSelector(state => state.session?.user);
    const lists = useSelector(state => Object.values(state.lists))

    //shopping cart
    let [cart, setCart] = useState([]);
    let savedCart = null;

    if (userId) {
        savedCart = localStorage.getItem(userId);
    }

    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        if (itemId) {
            dispatch(thunkGetOneItem(itemId))
            dispatch(thunkGetReviews(itemId))
            dispatch(thunkGetCartProducts(savedCart))
            dispatch(thunkGetLists(userId))
        }
    }, [dispatch, itemId, savedCart, userId])

    useEffect(() => {
        savedCart = JSON.parse(savedCart);
        if (savedCart !== null) {
            setCart(savedCart)
        }
    }, [savedCart]);

    let cartItem;

    if (cart) {
        const itemFound = cart.filter(item => item.item.id === parseInt(itemId));
        if (itemFound) {
            cartItem = itemFound
        }
    }



    const addItemToCart = (item, quantity) => {
        let cartCopy = [...cart];

        let existingItem = cartCopy.find(cartItem => cartItem.item.id === item.id)

        if (!existingItem) {
            cartCopy.push({ 'item': item, 'quantity': quantity })
            alert('Item added to cart!')
        } else {
            existingItem.quantity = quantity
            alert('Item quantity in cart updated!')
        }

        setCart(cartCopy);
        localStorage.setItem(userId, JSON.stringify(cartCopy));
        dispatch(thunkGetCartProducts(cartCopy))
    }

    const handleAddToList = async (listId) => {
        dispatch(thunkAddItemToList(listId, itemId));
        history.push('/lists')
    }

    return (
        <div className='single-item-page'>
            {item && (
                <div id='single-top'>
                    <div id='single-item-pic'>
                        <img src={item.image} alt='item img'></img>
                    </div>
                    <div className='single-item-info'>
                        <h1>{item.title}</h1>
                        <h2>{item.price} bells</h2>
                        <h3>About this item</h3>
                        <p>{item.description}</p>
                    </div>
                    <div className='single-form'>
                        {user && (
                            <>
                                <form >
                                    <h2>{item.price} bells</h2>
                                    <p>FREE 2 day delivery</p>
                                    <p id='deliver-to'>
                                        <i className="fa-solid fa-location-dot" />
                                        Deliver to {user.username} - {user.town_name}
                                    </p>
                                    <p id='in-stock'>In Stock</p>
                                    <p>Add to cart  <i className="fa-solid fa-cart-arrow-down" /></p>
                                    <label htmlFor='quantity'>Qty: </label>
                                    <select id='quantity' onChange={(e) => addItemToCart(item, e.target.value)} value={cartItem.length > 0 ? cartItem[0].quantity : ''}>
                                        <option value={''} disabled defaultChecked>Select quantity</option>
                                        <option value={1}>1</option>
                                        <option value={2}>2</option>
                                        <option value={3}>3</option>
                                        <option value={4}>4</option>
                                        <option value={5}>5</option>
                                        <option value={6}>6</option>
                                        <option value={7}>7</option>
                                        <option value={8}>8</option>
                                        <option value={9}>9</option>
                                        <option value={10}>10</option>
                                    </select>
                                    <div>
                                        {/* <button id='add-to-cart-btn'>Add To Cart</button> */}
                                    </div>
                                </form>
                                <div>
                                    <select id='add-to-list' onChange={(e) => handleAddToList(e.target.value)}>
                                        <option value={''} disabled defaultChecked>Add to list</option>
                                        {lists && lists.map(list => (
                                            <option value={list.id}>{list.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </>
                        )}
                        {!user && (
                            <p>Log in or sign up to add this to your cart</p>
                        )}
                    </div>
                </div>
            )}
            <div className='single-item-reviews'>
                <Reviews />
            </div>
        </div>
    )
}

export default SingleItem
