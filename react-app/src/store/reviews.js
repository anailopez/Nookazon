const GET_REVIEWS = 'review/getReviews'
const CREATE_REVIEW = 'review/createReview'

//regular action creators
export const actionGetReviews = (reviews) => {
    return {
        type: GET_REVIEWS,
        reviews
    }
}

export const actionCreateReview = (review) => {
    return {
        type: CREATE_REVIEW,
        review
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

export const thunkCreateReview = (id, review) => async (dispatch) => {
    const response = await fetch(`/api/reviews/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(review)
    })

    if (response.ok) {
        const data = await response.json();
        dispatch(actionCreateReview(data));
        return data
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

        case CREATE_REVIEW:
            let createState = { ...state }
            createState[action.review.id] = action.review
            return createState;

        default:
            return state;
    }
}

export default reviewsReducer
