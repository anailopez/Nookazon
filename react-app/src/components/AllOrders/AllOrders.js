import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetAllOrders } from "../../store/orders";
import './allorders.css'

const AllOrders = () => {
    const user = useSelector(state => state.session.user);
    const orders = useSelector(state => Object.values(state.orders))

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(thunkGetAllOrders(user.id))
    }, [dispatch])

    return (
        <>
            <h1>Your Orders</h1>
            {orders && orders.length > 0 && orders.map(order => (
                <div key={order.id}>
                    {console.log('***order', order)}
                    <p>Total: {order.total} bells</p>
                    <p>Delivery instructions: {order.delivery_info}</p>
                    {order.items.map(orderItem => (
                        <div className="order-item" key={orderItem.id}>
                            <img src={orderItem.item.image} />
                            <p>{orderItem.item.title}</p>
                        </div>
                    ))}
                </div>
            ))}
            {orders && !orders.length > 0 && (
                <p>You currently have no orders</p>
            )}
        </>
    )
}

export default AllOrders
