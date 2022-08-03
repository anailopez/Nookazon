const GET_REVIEWS = 'review/getReviews'

//regular action creators
export const actionGetReviews = (reviews) => {
    return {
        type: GET_REVIEWS,
        reviews
    }
}


//thunk action creator
export const thunkGetReviews = (id) => async (dispatch) => {
    const response = await fetch(`/api/reviews/${id}`)

    if (response.ok) {
        const data = await response.json();
        dispatch(actionGetReviews(data.reviews));
        return data.reviews
    } else {
        return await response.json()
    }
}


const initialState = {}

const reviewsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_REVIEWS:
            let getState = { ...state }
            action.reviews.forEach(review => {
                getState[review.id] = review
            })
            return getState;

        default:
            return state;
    }
}

export default reviewsReducer
