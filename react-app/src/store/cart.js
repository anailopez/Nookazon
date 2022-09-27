const GET_CART_PRODUCTS = 'cart/getCartProducts'
const DELETE_CART_PRODUCTS = 'cart/deleteCartProducts'

export const actionGetCartProducts = (products) => {
    return {
        type: GET_CART_PRODUCTS,
        products
    }
}

export const actionDeleteCartProducts = (products) => {
    return {
        type: DELETE_CART_PRODUCTS,
        products
    }
}

export const thunkGetCartProducts = (cart) => async (dispatch) => {
    dispatch(actionGetCartProducts(cart))
}

export const thunkDeleteCartProducts = (cart) => async (dispatch) => {
    dispatch(actionDeleteCartProducts(cart))
}

const initialState = {}

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CART_PRODUCTS:
            let cartState = { ...state }
            cartState[action.products] = action.products
            return cartState;

        case DELETE_CART_PRODUCTS:
            let deleteState = { ...state }
            delete deleteState[action.products]
            return deleteState;

        default:
            return state;
    }
}

export default cartReducer
