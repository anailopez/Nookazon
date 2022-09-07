import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { thunkGetAllOrders } from "../../store/orders";
import { thunkDeleteOrder } from "../../store/orders";
import './allorders.css'

const AllOrders = () => {
    const user = useSelector(state => state.session.user);
    const orders = useSelector(state => Object.values(state.orders));
    let savedCart = []

    const dispatch = useDispatch();

    if (user) {
        savedCart = localStorage.getItem(user.id);
    }

    // console.log(savedCart)

    useEffect(() => {
        dispatch(thunkGetAllOrders(user.id))
    }, [dispatch, user])


    const handleDelete = async (orderId) => {
        await dispatch(thunkDeleteOrder(orderId));
        await dispatch(thunkGetAllOrders(user.id))
    }


    return (
        <div className="all-orders">
            <h1>Your Orders</h1>
            {orders && orders.length > 0 && orders.map(order => (
                <div className="order-item-card" key={order.id}>
                    {/* {console.log('***order', Date(order.order_date))} */}
                    <div id='order-placed'>
                        <div id='placed-left'>
                            <div id='first'>
                                <p>Order Placed</p>
                                <p>{order.order_date}</p>
                            </div>
                            <div id='second'>
                                <p>Total</p>
                                <p>{order.total} bells</p>
                            </div>
                            <div id='third'>
                                <p>Ship To</p>
                                <p>{user.username}</p>
                            </div>
                        </div>
                        <div id='placed-right'>
                            <p>Order # {order.id}</p>
                            <Link to={`/order-details/${order.id}`}>
                                <button id='order-details-btn'>View Order Details</button>
                            </Link>
                        </div>
                    </div>
                    <div id='item-delete'>
                        <div>
                            <p id='delivery-date'>Delivery date: {order.delivery_date}</p>
                            <div id='item-sec'>
                                {order.items.map(orderItem => (
                                    <div className="order-item" key={orderItem.id}>
                                        <div id='order-item-deets'>
                                            <Link to={`/items/${orderItem.item.id}`}>
                                                <img src={orderItem.item.image} />
                                            </Link>
                                            <Link to={`/items/${orderItem.item.id}`}>
                                                <p id='p-item-link'>{orderItem.item.title}</p>
                                            </Link>
                                            {/* <p>Qty: {orderItem.quantity}</p> */}
                                        </div>
                                        <div>
                                            <Link to={`/create-review/${orderItem.item.id}`}>
                                                <button id='order-review-btn'>Write a product review</button>
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <button id='order-delete-btn' onClick={() => { handleDelete(order.id) }}>Delete order</button>
                        </div>
                    </div>
                </div>
            ))
            }
            {orders && !orders.length > 0 && (
                <>
                    <p>You currently have no orders</p>
                    <img src='https://s3.amazonaws.com/prod-media.gameinformer.com/styles/thumbnail/s3/2020/10/01/7665a011/acnh_hacked_items.jpg' />
                    <Link to='/'>
                        <button id='order-link-index'>Add some items to your cart and purchase them to see your orders here!</button>
                    </Link>
                </>
            )
            }
        </div>
    )
}

export default AllOrders
