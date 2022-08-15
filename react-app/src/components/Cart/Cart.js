import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { thunkGetCartProducts } from '../../store/cart';
import './cart.css'


const Cart = () => {
    const userId = useSelector(state => state.session.user.id)

    let [cart, setCart] = useState([]);
    const [itemId, setItemId] = useState(null);
    const [quantity, setQuantity] = useState(1);

    let savedCart = null;
    let total = 0;

    const dispatch = useDispatch();

    if (userId) {
        savedCart = localStorage.getItem(userId);
    }

    useEffect(() => {
        savedCart = JSON.parse(savedCart);
        if (savedCart !== null) {
            setCart(savedCart)
        }
    }, [savedCart]);


    const removeItem = (itemId) => {
        //create a copy of cart so state isn't overwritten!
        let cartCopy = [...cart];

        cartCopy = cartCopy.filter(cartItem => cartItem.item.id !== itemId);

        setCart(cartCopy);
        localStorage.setItem(userId, JSON.stringify(cartCopy));
    }

    const handleDelete = (e) => {
        e.preventDefault();
        removeItem(itemId)
        dispatch(thunkGetCartProducts(savedCart))
    }

    const updateQuantity = (item, quantity) => {
        let cartCopy = [...cart];

        let existingItem = cartCopy.find(cartItem => cartItem.item.id === item.id)

        if (existingItem) {
            existingItem.quantity = quantity
            // alert('Item quantity updated!')
        }

        setCart(cartCopy);
        localStorage.setItem(userId, JSON.stringify(cartCopy));
        dispatch(thunkGetCartProducts(savedCart));
        // console.log("***CART", cartCopy)
    }


    return (
        <div className='cart'>
            <div id='shopping-cart'>
                {cart && !cart.length > 0 && (
                    <div>
                        <p>Your Nookazon Cart is empty.</p>
                        <Link to='/'>
                            <button id='cart-link-index'>Add some items to your cart to see them here!</button>
                        </Link>
                        <div id='shopping-img-container'>
                            <img id='shopping-img' src='https://i.pinimg.com/736x/6c/0a/43/6c0a430048fb3997caaebcfa8530edcb.jpg' />
                        </div>
                    </div>
                )}
                {cart && cart.length > 0 && (
                    <>
                        <h1>Shopping Cart</h1>
                        {cart.map(cartItem => (
                            <div className='cart-item' key={cartItem.item.id}>
                                <div style={{ 'display': 'none' }}>
                                    {total += (cartItem.item.price * cartItem.quantity)}
                                    {/* {setQuantity(cartItem.quantity)} */}
                                </div>
                                <div id='cart-item-single'>
                                    <div id='inner-single'>
                                        <Link to={`/items/${cartItem.item.id}`}>
                                            <img src={cartItem.item.image} />
                                        </Link>
                                        <h2>{cartItem.item.title}</h2>
                                        <h3>{cartItem.item.price} bells</h3>
                                        <div id='inner-col'>
                                            <div>
                                                <label htmlFor='cart-quantity'>Qty:</label>
                                                <select id='cart-quantity' onChange={(e) => { updateQuantity(cartItem.item, e.target.value) }} value={cartItem.quantity}>
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
                                                {/* <button id='update-btn' onClick={() => updateQuantity(cartItem.item, quantity)}>Update quantity</button> */}
                                            </div>
                                            <form onSubmit={handleDelete}>
                                                <button id='cart-item-delete-btn' onClick={() => setItemId(cartItem.item.id)}>Delete</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <p>Subtotal ({cart.total}items): {total} bells</p>
                    </>
                )}
            </div>
            <div id='proceed-checkout'>
                <h2>Subtotal ({cart.length} item(s)): {total} bells</h2>
                {cart && cart.length > 0 && (
                    <Link to={`/checkout`}>
                        <button id='checkout-btn'>Proceed to checkout</button>
                    </Link>
                )}
            </div>
        </div >
    )
}

export default Cart
