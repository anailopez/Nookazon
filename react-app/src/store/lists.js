const CREATE_LIST = 'list/createList'
const GET_LISTS = 'list/getLists'
const DELETE_LIST = 'list/deleteList'
const ADD_ITEM_TO_LIST = 'list/addItem'
const REMOVE_ITEM_FROM_LIST = 'list/deleteItem'

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

const actionAddItem = (list) => {
    return {
        type: ADD_ITEM_TO_LIST,
        list
    }
}

const actionRemoveItem = (list) => {
    return {
        type: REMOVE_ITEM_FROM_LIST,
        list
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

export const thunkAddItemToList = (listId, itemId) => async (dispatch) => {
    const response = await fetch(`/api/lists/${listId}/add`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(itemId)
    });

    if (response.ok) {
        const list = await response.json()
        dispatch(actionAddItem(list))
        return list
    } else {
        return await response.json()
    }
}

export const thunkRemoveItemFromList = (listId, itemId) => async (dispatch) => {
    const response = await fetch(`/api/lists/${listId}/remove`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(itemId)
    });

    if (response.ok) {
        const list = await response.json()
        dispatch(actionRemoveItem(list))
        return list
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

        case ADD_ITEM_TO_LIST:
            let addItemState = { ...state }
            addItemState[action.list.id] = action.list
            return addItemState;

        case REMOVE_ITEM_FROM_LIST:
            let removeItemState = { ...state }
            removeItemState[action.list.id] = action.list
            return removeItemState

        default:
            return state;
    }
}

export default listsReducer
