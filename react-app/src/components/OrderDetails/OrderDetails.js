import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { thunkGetSingleOrder } from "../../store/orders";
import { thunkEditOrder } from "../../store/orders";
import Modal from 'react-modal';
import './orderDetails.css'

const OrderDetails = () => {
    const { orderId } = useParams();
    const user = useSelector(state => state.session.user)
    const order = useSelector(state => state.orders[orderId])
    const [showEditForm, setShowEditForm] = useState(false);
    const [deliveryInfo, setDeliveryInfo] = useState(order?.delivery_info);
    Modal.setAppElement('body');

    //python datetime for dates?
    // console.log(order);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(thunkGetSingleOrder(orderId))
    }, [dispatch, orderId]);


    function openEditModal() {
        setShowEditForm(true)
    }

    function closeEditModal() {
        setShowEditForm(false)
    }

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };

    console.log(deliveryInfo)

    return (
        <div className="order-details">
            {order && (
                <div className="order-details-content">
                    <h1>Order Details</h1>
                    <div className="basic-info" id='main'>
                        <div id='order-basic-info'>
                            <p id='first-p'>Ordered on {order.order_date}</p>
                            <p id='second-p'>Order # {orderId}</p>
                        </div>
                        <div>
                            <Modal isOpen={showEditForm} style={customStyles}>
                                <form>
                                    <p>Where should we leave your packages at this address?</p>
                                    <textarea
                                        onChange={(e) => setDeliveryInfo(e.target.value)}
                                        value={deliveryInfo}
                                    >{deliveryInfo}</textarea>
                                </form>
                                <button onClick={() => { dispatch(thunkEditOrder(order.id, deliveryInfo)); closeEditModal() }}>Update instructions</button>
                                <button onClick={closeEditModal}>Cancel</button>
                            </Modal>
                            <button id='edit-delivery-btn' onClick={openEditModal}>Edit delivery instructions</button>
                        </div>
                    </div>

                    <div className="details">
                        <div>
                            <h3>Shipping Address</h3>
                            <p>{user.street_address}</p>
                            <p>{user.town_name}</p>
                        </div>
                        <div>
                            <h3>Payment Method</h3>
                            <p><i class="fa-solid fa-credit-card" /> ending in {user.payment_method}</p>
                        </div>
                        <div>
                            <h3>Delivery Instructions</h3>
                            <p>{order.delivery_info}</p>
                        </div>
                        <div>
                            <h3>Order Summary</h3>
                            <p>Order total: {order.total} bells</p>
                        </div>
                    </div>

                    <div className="shipments">
                        <div className="shipments-header">
                            <h2>{order.items.length} Shipment(s)</h2>
                        </div>
                        {order && order.items.map(orderItem => (
                            <div key={orderItem.id} className='orderDetails-item'>
                                {/* <p id='date'>{order.delivery_date}</p> */}
                                <div className="image-buyagain">
                                    <Link to={`/items/${orderItem.item.id}`}>
                                        <img src={orderItem.item.image} alt="orderItem img" />
                                    </Link>
                                    <div id='buy-again'>
                                        <Link to={`/items/${orderItem.item.id}`}>
                                            <p id='p-item-link'>{orderItem.item.title}</p>
                                        </Link>
                                        <p id='orderitem-price'>{orderItem.item.price} bells</p>
                                        <p>Qty: {orderItem.quantity}</p>
                                        <Link to={`/items/${orderItem.item.id}`}>
                                            <button id='buy-again-btn'><i class="fa-solid fa-bag-shopping" />Buy it again</button>
                                        </Link>
                                    </div>
                                </div>
                                <div>
                                    <Link to={`/create-review/${orderItem.item.id}`}>
                                        <button className="details-review-btn" id='order-review-btn'>Write a product review</button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>

    )
}

export default OrderDetails
