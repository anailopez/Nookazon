const GET_ALL_ORDERS = 'order/getAllOrders'
const DELETE_ORDER = 'order/deleteOrder'
const CREATE_ORDER = 'order/createOrder'

//regular action creators
export const actionGetAllOrders = (orders) => {
    return {
        type: GET_ALL_ORDERS,
        orders
    }
}

export const actionDeleteOrder = (orderId) => {
    return {
        type: DELETE_ORDER,
        orderId
    }
}

export const actionCreateOrder = (order) => {
    return {
        type: CREATE_ORDER,
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

export const thunkCreateOrder = (userId, total, delivery, cart) => async (dispatch) => {
    const response = await fetch(`/api/orders/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify([userId, total, delivery, cart])
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(actionCreateOrder(data))
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

        case CREATE_ORDER:
            let createState = { ...state }
            createState[action.order.id] = action.order
            return createState;

        default:
            return state;
    }
}

export default ordersReducer
