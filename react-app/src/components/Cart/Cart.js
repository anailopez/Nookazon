import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { thunkGetCartProducts } from '../../store/cart';
import './cart.css'


const Cart = () => {
    const userId = useSelector(state => state.session.user.id)

    let [cart, setCart] = useState([]);
    const [itemId, setItemId] = useState(null);

    let savedCart = null;
    let total = 0;
    let quantity = 0;

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

    useEffect(() => {
        dispatch(thunkGetCartProducts(savedCart))
    }, [dispatch, savedCart])

    const removeItem = (itemId) => {
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
        }

        setCart(cartCopy);
        localStorage.setItem(userId, JSON.stringify(cartCopy));
        dispatch(thunkGetCartProducts(savedCart));
    }

    if (cart) {
        cart.forEach(item => {
            quantity += parseInt(item.quantity)
        });
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
                            <img id='shopping-img' alt='shopping cart' src='https://i.pinimg.com/736x/6c/0a/43/6c0a430048fb3997caaebcfa8530edcb.jpg' />
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
                                </div>
                                <div id='cart-item-single'>
                                    <div id='inner-single'>
                                        <Link to={`/items/${cartItem.item.id}`}>
                                            <img alt='cart item' src={cartItem.item.image} />
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
                                            </div>
                                            <form onSubmit={handleDelete}>
                                                <button id='cart-item-delete-btn' onClick={() => setItemId(cartItem.item.id)}>Delete</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {quantity && quantity >= 2 && (
                            <p>Subtotal ({quantity} items): {total} bells</p>
                        )}
                        {quantity && quantity === 1 && (
                            <p>Subtotal ({quantity} item): {total} bells</p>
                        )}
                    </>
                )}
            </div>
            {quantity !== 0 && (
                <div id='proceed-checkout'>
                    {quantity >= 2 && (
                        <h2>Subtotal ({quantity} items): {total} bells</h2>
                    )}
                    {quantity === 1 && (
                        <h2>Subtotal ({quantity} item): {total} bells</h2>
                    )}
                    {cart && cart.length > 0 && (
                        <Link to={`/checkout`}>
                            <button id='checkout-btn'>Proceed to checkout</button>
                        </Link>
                    )}
                </div>
            )}
        </div >
    )
}

export default Cart
