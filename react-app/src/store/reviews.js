const GET_REVIEWS = 'review/getReviews'
const CREATE_REVIEW = 'review/createReview'
const DELETE_REVIEW = 'review/deleteReview'
const UPDATE_REVIEW = 'review/updateReview'

//regular action creators
const actionGetReviews = (reviews) => {
    return {
        type: GET_REVIEWS,
        reviews
    }
}

const actionCreateReview = (review) => {
    return {
        type: CREATE_REVIEW,
        review
    }
}

const actionDeleteReview = (reviewId) => {
    return {
        type: DELETE_REVIEW,
        reviewId
    }
}

const actionUpdateReview = (review) => {
    return {
        type: UPDATE_REVIEW,
        review
    }
}


//thunk action creators
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
    const response = await fetch(`/api/reviews/${id}/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(review)
    })

    if (response.ok) {
        const data = await response.json();
        dispatch(actionCreateReview(data));
        return null;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ['An error occurred. Please try again.']
    }
}

export const thunkDeleteReview = (id) => async (dispatch) => {
    const response = await fetch(`/api/reviews/${id}/delete`, {
        method: 'DELETE'
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(actionDeleteReview(id));
        return data
    } else {
        return await response.json()
    }
}

export const thunkUpdateReview = (review) => async (dispatch) => {
    const response = await fetch(`/api/reviews/${review.id}/update`, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(review)
    })

    if (response.ok) {
        const data = await response.json();
        dispatch(actionCreateReview(data));
        return null;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ['An error occurred. Please try again.']
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

        case DELETE_REVIEW:
            let deleteState = { ...state }
            delete deleteState[action.reviewId]
            return deleteState;

        case UPDATE_REVIEW:
            let updateState = { ...state }
            updateState[action.review.id] = action.review
            return updateState;

        default:
            return state;
    }
}

export default reviewsReducer
