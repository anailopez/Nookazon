import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { thunkGetCartProducts } from '../../store/cart';
import cart_icon from '../../images/cart.png';


const CartIcon = () => {
    const userId = useSelector((state) => state.session?.user?.id);

    let [cart, setCart] = useState([]);
    let quantity = 0;
    let savedCart = null;

    const dispatch = useDispatch();

    if (userId) {
        savedCart = localStorage.getItem(userId);
    }

    useEffect(() => {
        dispatch(thunkGetCartProducts(savedCart))
    }, [dispatch, savedCart])

    useEffect(() => {
        savedCart = JSON.parse(savedCart);
        if (savedCart !== null) {
            setCart(savedCart)
        }
    }, [savedCart]);


    if (cart) {
        cart.forEach(item => {
            quantity += parseInt(item.quantity)
        });
    }


    return (
        <>
            {cart && savedCart !== null && (
                <span id='cart'>
                    <img className='cart-icon' alt='cart icon' src={`${cart_icon}`} />
                    {quantity > 9 && (
                        <p id='p-10'>{quantity}</p>
                    )}
                    {quantity < 10 && (
                        <p id='p-under-10'>{quantity}</p>
                    )}
                </span>
            )}
            {savedCart === null && (
                <span id='cart'>
                    <img className='cart-icon' alt='cart icon' src={`${cart_icon}`} />
                    <p id='p-empty-cart'>{0}</p>
                </span>
            )}
        </>
    )
}

export default CartIcon
