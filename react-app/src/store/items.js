const GET_ALL_ITEMS = 'item/getAllItems'
const GET_ONE_ITEM = 'item/getOneItem'


//regular action creators
export const actionGetAllItems = (items) => {
    return {
        type: GET_ALL_ITEMS,
        items
    }
}

export const actionGetOneItem = (item) => {
    return {
        type: GET_ONE_ITEM,
        item
    }
}



//thunk action creators
export const thunkGetAllItems = () => async (dispatch) => {
    const response = await fetch('/api/items/');

    if (response.ok) {
        const data = await response.json();
        // console.log('***FROM THUNK', data.items);
        dispatch(actionGetAllItems(data.items));
        return data.items
    } else {
        return await response.json()
    }
}

export const thunkGetOneItem = (id) => async (dispatch) => {
    const response = await fetch(`/api/items/${id}`);

    if (response.ok) {
        const item = await response.json();
        dispatch(actionGetOneItem(item));
        return item
    } else {
        return await response.json()
    }
}


const initialState = {}

const itemsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_ITEMS:
            let getAllState = { ...state }
            // console.log('***FROM REDUCER', action.items)
            action.items.forEach(item => {
                getAllState[item.id] = item
            });
            return getAllState;

        case GET_ONE_ITEM:
            let getOneState = { ...state }
            getOneState[action.item.id] = action.item
            return getOneState;

        default:
            return state;
    }
}

export default itemsReducer
