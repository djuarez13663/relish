//constants
const initialState = {
    photoList: [],
    total: 0
}

//types
const UPDATE_LIST = "UPDATE_LIST"

//reducer
export default function photosReducer(state = initialState, action) {
    switch (action.type) {
        case 'UPDATE_LIST':
            return { ...state, photoList: action.payload.list, total: action.payload.total }
        default:
            return state
    }
}

//actions
export const updateList = (list, total) => async (dispatch, getState) => {
    dispatch({
        type: UPDATE_LIST,
        payload: {
            list: list,
            total: total
        }
    })
}