import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import './checkout.css';

const Checkout = () => {
    const user = useSelector(state => state.session.user)

    let [cart, setCart] = useState([]);
    let savedCart = null;
    let total = 0;

    if (user) {
        savedCart = localStorage.getItem(user.id);
    }

    useEffect(() => {
        savedCart = JSON.parse(savedCart);
        if (savedCart !== null) {
            setCart(savedCart)
        }
    }, [savedCart]);

    return (
        <div className="all-checkout">
            <div id='left'>
                <h1>Checkout ({cart.length} item(s))</h1>
                <div id="address">
                    <h2>Shipping address</h2>
                    <p>{user.username}</p>
                    <p>{user.address}</p>
                    <button>Add delivery instructions</button>
                </div>

                <div id='payment'>
                    <h2>Payment method</h2>
                    <input type='radio' id='cards' name='payment' value='cards' defaultChecked />
                    <label htmlFor='cards'>
                        <i className="fa-brands fa-cc-visa" />
                        <i className="fa-brands fa-cc-mastercard" />
                        <i className="fa-brands fa-cc-amex" />
                        <i className="fa-brands fa-cc-discover" />
                    </label>
                    <div className='payment-select'>
                        <span className='check'>
                            <input type='radio' id='paypal' name='payment' value='paypal' className='radio-payments' />
                            <label htmlFor='paypal'><i className="fa-brands fa-cc-paypal" /></label>
                        </span>
                    </div>
                    <div className='payment-select'>
                        <span className='check'>
                            <input type='radio' id='applepay' name='payment' value='applepay' className='radio-payments' />
                            <label htmlFor='applepay'><i className="fa-brands fa-cc-apple-pay" /></label>
                        </span>
                    </div>
                    <p>Billing address: Same as shipping address</p>
                </div>

                <div id='review'>
                    <h2>Review items and shipping</h2>
                    {cart && cart.map(cartItem => (
                        <div className="checkout-item">
                            <div style={{ 'display': 'none' }}>
                                {total += (cartItem.item.price * cartItem.quantity)}
                            </div>
                            <img src={cartItem.item.image} />
                            <h3>{cartItem.item.title}</h3>
                            <h4>{cartItem.item.price} bells</h4>
                            <p>Qty: {cartItem.quantity}</p>
                            <div>
                                <h3>Choose your Prime delivery option: </h3>
                                <span>
                                    <input type='radio' name='Prime' value='Prime Delivery' />
                                    <label htmlFor="Prime">FREE Prime Delivery</label>
                                </span>
                                <span>
                                    <input type='radio' name='Nookazon' value='Nookazon Day' />
                                    <label htmlFor="Nookazon">FREE Nookazon Day Delivery</label>
                                </span>

                            </div>
                        </div>
                    ))}
                </div>

                <div id='bottom-order'>
                    <button>Place your order</button>
                    <h2>Order Total: {total} bells </h2>
                </div>
            </div>

            <div id='right'>
                <div className="right-order">
                    <button>Place your order</button>
                    <h2>Order Summary</h2>
                    <p>Item(s) ({cart.length}): {total} bells</p>
                    <p>Shipping and handling: 0 bells</p>
                    <p>Total before tax: {total} bells</p>
                    <p>Estimated tax to be collected: 200 bells</p>
                    <h2>Order total: {total += 200} bells</h2>
                </div>
            </div>
        </div>
    )
}

export default Checkout
