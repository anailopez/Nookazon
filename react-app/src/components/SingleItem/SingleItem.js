import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { thunkGetOneItem } from '../../store/items';
import { thunkGetReviews } from '../../store/reviews';
import { thunkGetCartProducts } from '../../store/cart'
import Reviews from '../Reviews/Reviews';
import './singleitem.css'

const SingleItem = () => {
    const { itemId } = useParams();
    const item = useSelector(state => state.allItems[itemId]);
    const userId = useSelector(state => state.session?.user?.id);
    const user = useSelector(state => state.session?.user)

    //shopping cart
    let [cart, setCart] = useState([]);
    const [quantity, setQuantity] = useState(1);
    let savedCart = null;

    if (userId) {
        savedCart = localStorage.getItem(userId);
    }

    // console.log(savedCart)

    const dispatch = useDispatch();

    useEffect(() => {
        if (itemId) {
            dispatch(thunkGetOneItem(itemId))
            dispatch(thunkGetReviews(itemId))
            dispatch(thunkGetCartProducts(savedCart))
        }
    }, [dispatch, itemId])

    useEffect(() => {
        savedCart = JSON.parse(savedCart);
        if (savedCart !== null) {
            setCart(savedCart)
        }
    }, [savedCart]);

    //the goal is to have something like this:
    // userId : {{'item1': {item}, 'quantity': quantity}, {'item2'....}}

    const addItemToCart = (item, quantity) => {
        //create a copy of cart so state isn't overwritten!
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

    const handleSubmit = (e) => {
        e.preventDefault();
        addItemToCart(item, quantity);
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
                            <form onSubmit={handleSubmit}>
                                <h2>{item.price} bells</h2>
                                <p>FREE 2 day delivery</p>
                                <p id='deliver-to'>
                                    <i className="fa-solid fa-location-dot" />
                                    Deliver to {user.username} - {user.town_name}
                                </p>
                                <p id='in-stock'>In Stock</p>
                                <label htmlFor='quantity'>Qty: </label>
                                <select id='quantity' onChange={(e) => setQuantity(parseInt(e.target.value))} value={quantity}>
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
                                    <button id='add-to-cart-btn'>Add To Cart</button>
                                </div>
                            </form>
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
