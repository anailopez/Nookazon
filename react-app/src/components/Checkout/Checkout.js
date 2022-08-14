import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { thunkCreateOrder } from "../../store/orders";
// import { thunkGetAllOrders } from "../../store/orders";
import { thunkGetCartProducts } from "../../store/cart";
import Modal from 'react-modal';
import './checkout.css';

const Checkout = () => {
    const user = useSelector(state => state.session.user);
    const history = useHistory();
    Modal.setAppElement('body');

    const dispatch = useDispatch();

    const [delivery_info, setDeliveryInfo] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [showDelivery, setShowDelivery] = useState(false);
    const [validationErrors, setValidationErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    let [cart, setCart] = useState([]);
    let savedCart = null;
    let total = 0;

    const date = new Date();
    const days = 2;
    date.setDate(date.getDate() + days);
    const formattedDate = date.toLocaleDateString('en-us', { weekday: "long", year: "numeric", month: "short", day: "numeric" });


    if (user) {
        savedCart = localStorage.getItem(user.id);
    }

    useEffect(() => {
        savedCart = JSON.parse(savedCart);
        if (savedCart !== null) {
            setCart(savedCart)
        }
    }, [savedCart]);


    const updateQuantity = (item, quantity) => {
        let cartCopy = [...cart];

        let existingItem = cartCopy.find(cartItem => cartItem.item.id === item.id)

        if (existingItem) {
            existingItem.quantity = quantity
            // alert('Item quantity updated!')
        }

        setCart(cartCopy);
        localStorage.setItem(user.id, JSON.stringify(cartCopy));
        dispatch(thunkGetCartProducts(savedCart));
    }

    useEffect(() => {
        const errors = [];

        if (!delivery_info.length) {
            errors.push('Please provide delivery instructions')
        }
        if (delivery_info.length > 200) {
            errors.push('Delivery Instructions cannot exceed 200 characters')
        }

        setValidationErrors(errors);
    }, [delivery_info]);

    const reset = () => {
        setDeliveryInfo('');
        setQuantity(1);
        setShowDelivery(false);
        setValidationErrors([]);
        setHasSubmitted(false);
    }

    const handleOrder = async (e) => {
        e.preventDefault();

        setHasSubmitted(true);

        if (validationErrors.length > 0) {
            return alert("Cannot submit order")
        }

        const order = await dispatch(thunkCreateOrder(user.id, total, delivery_info, cart));

        if (order) {
            localStorage.removeItem(user.id);
            reset();
            history.push('/orders');
            dispatch(thunkGetCartProducts(savedCart));
            return alert('Order placed!');
        }
    }

    function openDeliveryModal() {
        setShowDelivery(true)
    }

    function closeDeliveryModal() {
        setShowDelivery(false)
    }

    const styling = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };


    return (
        <div className="all-checkout">
            <div className="all-checkout-content">
                <div id='left'>
                    <h1>Checkout ({cart.length} item(s))</h1>
                    <div id="address">
                        <div id='address-info'>
                            <h2>1 Shipping address</h2>
                            <p>{user.username}</p>
                            <p>{user.street_address}</p>
                            <p>{user.town_name}</p>
                        </div>
                        <div>
                            <ul>
                                {hasSubmitted && validationErrors.length > 0 && validationErrors.map(error => (
                                    <li id='error-msgs' key={error}>{error}</li>
                                ))}
                            </ul>
                            <button id='open-deliv' onClick={openDeliveryModal}>Add delivery instructions</button>
                        </div>
                        <Modal isOpen={showDelivery} style={styling}>
                            <form id='form-styling'>
                                <p>Delivery instructions</p>
                                <ul>
                                    {hasSubmitted && validationErrors.length > 0 && validationErrors.map(error => (
                                        <li id='error-msgs' key={error}>{error}</li>
                                    ))}
                                </ul>
                                <textarea
                                    placeholder="Where should we leave your package?"
                                    rows={'8'}
                                    cols={'35'}
                                    onChange={(e) => setDeliveryInfo(e.target.value)}
                                    value={delivery_info}
                                    required
                                />
                            </form>
                            <button id='modal-btn' onClick={closeDeliveryModal}>Save</button>
                        </Modal>
                    </div>
                    <div id='payment'>
                        <h2>2 Payment method</h2>
                        <p><i class="fa-solid fa-credit-card" /> ending in {user.payment_method}</p>
                        <p>Billing address: Same as shipping address</p>
                    </div>
                    <div id='review'>
                        <h2>3 Review items and shipping</h2>
                        {cart && cart.map(cartItem => (
                            <div className="checkout-item">
                                <div style={{ 'display': 'none' }}>
                                    {total += (cartItem.item.price * cartItem.quantity)}
                                </div>
                                <div>
                                    <img src={cartItem.item.image} />
                                    <h3>{cartItem.item.title}</h3>
                                    <h4>{cartItem.item.price} bells</h4>
                                    <p>Qty: {cartItem.quantity}</p>
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
                                    <button id='update-btn' onClick={() => updateQuantity(cartItem.item, quantity)}>Update quantity</button>
                                </div>
                                <div>
                                    <h3>Choose your Prime delivery option: </h3>
                                    <form>
                                        <div>
                                            <input type='radio' name='delivery' value='Prime Delivery' defaultChecked />
                                            <label id='prime-radio' htmlFor="Prime">{formattedDate}</label>
                                            <p>FREE Prime Delivery</p>
                                        </div>
                                        {/* <div>
                                            <input type='radio' name='delivery' value='Nookazon Day' />
                                            <label htmlFor="Nookazon">FREE Nookazon Day Delivery</label>
                                        </div> */}
                                    </form>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div id='bottom-order'>
                        <form onSubmit={handleOrder}>
                            <button id='bottom-btn'>Place your order</button>
                        </form>
                        <h2>Order Total: {total} bells </h2>
                    </div>
                </div>

                <div id='right'>
                    <div className="right-order">
                        <form onSubmit={handleOrder}>
                            <button>Place your order</button>
                            <h2>Order Summary</h2>
                            <p>Item(s) ({cart.length}): {total} bells</p>
                            <p>Shipping and handling: 0 bells</p>
                            <p>Total before tax: {total} bells</p>
                            <p>Estimated tax to be collected: 200 bells</p>
                            <h3>Order total: {total += 200} bells</h3>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Checkout
