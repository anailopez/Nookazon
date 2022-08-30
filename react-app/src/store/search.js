const GET_SEARCH_RESULTS = 'search/getResults'
const CLEAR_RESULTS = 'search/clearResults'


const actionGetSearchResults = (results) => {
    return {
        type: GET_SEARCH_RESULTS,
        results
    }
}

const actionClearResults = (results) => {
    return {
        type: CLEAR_RESULTS,
        results
    }
}

export const thunkGetSearchResults = (id) => async (dispatch) => {
    const response = await fetch(`/api/search/${id}`)

    if (response.ok) {
        const data = await response.json();
        dispatch(actionGetSearchResults(data.items));
        return data.items
    } else {
        return await response.json()
    }
}

export const thunkClearResults = (id) => async (dispatch) => {
    dispatch(actionClearResults(id))
}


const initalState = {}

const searchReducer = (state = initalState, action) => {
    switch (action.type) {
        case GET_SEARCH_RESULTS:
            let newState = { ...state }
            action.results.forEach(item => {
                newState[item.id] = item
            })
            return newState;

        case CLEAR_RESULTS:
            let clearState = { ...state }
            delete clearState[action.results]
            return clearState;

        default:
            return state;
    }
}

export default searchReducer
