const CREATE_LIST = 'list/createList'
const GET_LISTS = 'list/getLists'
const DELETE_LIST = 'list/deleteList'


//regular action creators
const actionCreateList = (list) => {
    return {
        type: CREATE_LIST,
        list
    }
}

const actionGetLists = (lists) => {
    return {
        type: GET_LISTS,
        lists
    }
}

const actionDeleteList = (listId) => {
    return {
        type: DELETE_LIST,
        listId
    }
}


//thunk action creators
export const thunkCreateList = (list) => async (dispatch) => {
    const response = await fetch('/api/lists/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(list)
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(actionCreateList(data));
        return null;
    } else if (response.status <= 400) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ['An error occurred. Please try again.']
    }
}

export const thunkGetLists = (id) => async (dispatch) => {
    const response = await fetch(`/api/lists/${id}`)

    if (response.ok) {
        const data = await response.json()
        dispatch(actionGetLists(data.lists))
        return data.lists
    } else {
        return await response.json()
    }
}

export const thunkDeleteList = (id) => async (dispatch) => {
    const response = await fetch(`/api/lists/${id}/delete`, {
        method: 'DELETE'
    });

    if (response.ok) {
        const data = await response.json()
        dispatch(actionDeleteList(id))
        return data
    } else {
        return await response.json()
    }
}


const initialState = {}

const listsReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_LIST:
            let createState = { ...state }
            createState[action.list.id] = action.list
            return createState;

        case GET_LISTS:
            let getState = { ...state }
            action.lists.forEach(list => {
                getState[list.id] = list
            })
            return getState;

        case DELETE_LIST:
            let deleteState = { ...state }
            delete deleteState[action.listId]
            return deleteState;

        default:
            return state;
    }
}

export default listsReducer
