const GET_CART_PRODUCTS = 'cart/getCartProducts'

export const actionGetCartProducts = (products) => {
    return {
        type: GET_CART_PRODUCTS,
        products
    }
}


export const thunkGetCartProducts = (cart) => async (dispatch) => {
    console.log("from thunk", cart)
    dispatch(actionGetCartProducts(cart))
}

const initialState = {}

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CART_PRODUCTS:
            let cartState = { ...state }
            cartState[action.products] = action.products
            return cartState;

        default:
            return state;
    }
}

export default cartReducer
