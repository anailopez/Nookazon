import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cart_icon from '../../images/cart.png';


const CartIcon = () => {
    const userId = useSelector((state) => state.session?.user?.id);
    let [cart, setCart] = useState([]);
    // const [quantity, setQuantity] = useState(0);
    // let quantity = 0;
    let savedCart = null;

    if (userId) {
        savedCart = localStorage.getItem(userId);
    }

    useEffect(() => {
        savedCart = JSON.parse(savedCart);
        if (savedCart !== null) {
            setCart(savedCart)
            // console.log(savedCart)
            // savedCart.forEach(item => {
            //     quantity += item.quantity
            // })
        }
    }, [savedCart]);

    // console.log("***", quantity)

    return (
        <>
            {cart && (
                <span id='cart'>
                    < img className='cart-icon' src={`${cart_icon}`} />
                    <p>{cart.length}</p>
                </span>
            )}
        </>
    )
}

export default CartIcon
