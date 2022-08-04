import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';


const Cart = () => {
    const userId = useSelector(state => state.session.user.id)

    let [cart, setCart] = useState([]);
    let savedCart = null;

    if (userId) {
        savedCart = localStorage.getItem(userId);
    }

    useEffect(() => {
        savedCart = JSON.parse(savedCart);
        if (savedCart !== null) {
            setCart(savedCart)
        }
    }, [savedCart]);

    console.log("***CART", cart)

    // const updateCartItem = (itemId, quantity) => {
    //     //todo
    // }

    // const removeItemFromCart = (itemId) => {
    //     //todo
    // }

    return (
        <div>
            <h1>Shopping Cart</h1>
            {cart && cart.map(cartItem => (
                <div className='cart-item'>
                    <img src={cartItem.item.image} />
                    <h2>{cartItem.item.title}</h2>
                    <h3>{cartItem.item.price} bells</h3>
                    
                </div>
            ))}
            {cart && !cart.length > 0 && (
                <p>Your cart is empty!</p>
            )}
        </div>
    )
}

export default Cart
