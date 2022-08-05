import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './cart.css'


const Cart = () => {
    const userId = useSelector(state => state.session.user.id)

    let [cart, setCart] = useState([]);
    const [itemId, setItemId] = useState(null);
    let savedCart = null;
    let total = 0;

    if (userId) {
        savedCart = localStorage.getItem(userId);
    }

    useEffect(() => {
        savedCart = JSON.parse(savedCart);
        if (savedCart !== null) {
            setCart(savedCart)
        }
    }, [savedCart]);

    // console.log("***CART", cart)

    // const updateCartItem = (itemId, quantity) => {
    //     //todo
    // }

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
    }

    return (
        <div>
            <h1>Shopping Cart</h1>
            {cart && cart.map(cartItem => (
                <div className='cart-item' key={cartItem.item.id}>
                    <div style={{ 'display': 'none' }}>
                        {total += (cartItem.item.price * cartItem.quantity)}
                    </div>
                    <Link to={`/items/${cartItem.item.id}`}>
                        <img src={cartItem.item.image} />
                    </Link>
                    <h2>{cartItem.item.title}</h2>
                    <h3>{cartItem.item.price} bells</h3>
                    <p>Qty: {cartItem.quantity}</p>
                    <form onSubmit={handleDelete}>
                        <button onClick={() => setItemId(cartItem.item.id)}>Delete</button>
                    </form>
                </div>
            ))}
            {cart && !cart.length > 0 && (
                <p>Your Nookazon Cart is empty.</p>
            )}
            <div>
                <h2>Subtotal ({cart.length} item(s)): {total} bells</h2>
                <Link to={`/checkout`}>
                    <button>Proceed to checkout</button>
                </Link>
            </div>
        </div>
    )
}

export default Cart
