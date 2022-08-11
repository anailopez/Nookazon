import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { thunkGetCartProducts } from '../../store/cart';
import cart_icon from '../../images/cart.png';


const CartIcon = () => {
    const userId = useSelector((state) => state.session?.user?.id);
    const stateCart = useSelector((state) => state.cart)
    // console.log("from cart icon", stateCart)
    let [cart, setCart] = useState([]);
    // const [quantity, setQuantity] = useState(0);
    // let quantity = 0;
    let savedCart = null;

    const dispatch = useDispatch();

    if (userId) {
        savedCart = localStorage.getItem(userId);
    }

    useEffect(() => {
        savedCart = JSON.parse(savedCart);
        // console.log("use effect triggered", savedCart);
        if (savedCart !== null) {
            setCart(savedCart)
            // console.log(savedCart)
            // savedCart.forEach(item => {
            //     quantity += item.quantity
            // })
        }
    }, [savedCart]);

    useEffect(() => {
        dispatch(thunkGetCartProducts(savedCart))
    }, [dispatch])

    return (
        <>
            {cart && savedCart !== null && (
                <span id='cart'>
                    < img className='cart-icon' src={`${cart_icon}`} />
                    <p>{cart.length}</p>
                </span>
            )}
            {savedCart === null && (
                <span id='cart'>
                    < img className='cart-icon' src={`${cart_icon}`} />
                    <p>{0}</p>
                </span>
            )}
        </>
    )
}

export default CartIcon
