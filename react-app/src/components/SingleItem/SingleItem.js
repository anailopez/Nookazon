import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { thunkGetOneItem } from '../../store/items';
import { thunkGetReviews } from '../../store/reviews';
import Reviews from '../Reviews/Reviews';
import './singleitem.css'

const SingleItem = () => {
    const { itemId } = useParams();
    const item = useSelector(state => state.allItems[itemId]);
    const userId = useSelector(state => state.session.user.id)

    //shopping cart
    let [cart, setCart] = useState([]);
    //update quantity in component and then attach it to item, before passing in to functions?
    const [quantity, setQuantity] = useState(1);
    let savedCart = null;

    if (userId) {
        savedCart = localStorage.getItem(userId);
    }

    const dispatch = useDispatch();

    useEffect(() => {
        if (itemId) {
            dispatch(thunkGetOneItem(itemId))
            dispatch(thunkGetReviews(itemId))
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
        } else {
            existingItem.quantity = quantity
        }

        setCart(cartCopy);
        localStorage.setItem(userId, JSON.stringify(cartCopy));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        addItemToCart(item, quantity);
        return alert('Item added to cart!')
    }

    // console.log("***CART", cart)

    return (
        <>
            {item && (
                <>
                    <div className='single-item-display'>
                        <h1>{item.title}</h1>
                        <h2>{item.price} bells</h2>
                        <h3>About this item</h3>
                        <p>{item.description}</p>
                        <img src={item.image} alt='item img'></img>
                    </div>
                    <div>
                        <form onSubmit={handleSubmit}>
                            <label htmlFor='quantity'>Quantity: </label>
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
                            <button>Add To Cart</button>
                        </form>
                    </div>
                </>
            )}
            <div>
                <h2>Reviews</h2>
                <Reviews />
            </div>
        </>
    )
}

export default SingleItem
