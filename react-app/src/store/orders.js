const GET_ALL_ORDERS = 'order/getAllOrders'
const DELETE_ORDER = 'order/deleteOrder'

//regular action creators
export const actionGetAllOrders = (orders) => {
    return {
        type: GET_ALL_ORDERS,
        orders
    }
}

export const actionDeleteOrder = (order) => {
    return {
        type: DELETE_ORDER,
        order
    }
}

//thunk action creators
export const thunkGetAllOrders = (userId) => async (dispatch) => {
    const response = await fetch(`/api/orders/${userId}`)

    if (response.ok) {
        const data = await response.json();
        dispatch(actionGetAllOrders(data.orders))
        return data.orders
    } else {
        return await response.json()
    }
}

export const thunkDeleteOrder = (orderId) => async (dispatch) => {
    const response = await fetch(`/api/orders/${orderId}/delete`, {
        method: 'DELETE'
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(actionDeleteOrder(orderId));
        return data
    } else {
        return await response.json()
    }
}


const initialState = {}

const ordersReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_ORDERS:
            let getAllState = { ...state }
            action.orders.forEach(order => {
                getAllState[order.id] = order
            })
            return getAllState;

        case DELETE_ORDER:
            let deleteState = { ...state }
            delete deleteState[action.orderId]
            return deleteState;

        default:
            return state;
    }
}

export default ordersReducer
