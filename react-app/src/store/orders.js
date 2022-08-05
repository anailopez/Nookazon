const GET_ALL_ORDERS = 'order/getAllOrders'

//regular action creators
export const actionGetAllOrders = (orders) => {
    return {
        type: GET_ALL_ORDERS,
        orders
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



const initialState = {}

const ordersReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_ORDERS:
            let getAllState = { ...state }
            action.orders.forEach(order => {
                getAllState[order.id] = order
            })
            return getAllState;

        default:
            return state;
    }
}

export default ordersReducer
