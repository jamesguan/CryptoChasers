import { actionTypes } from "./actionTypes";
export const changeSearchText = (text) => {
    return dispatch => {
        dispatch({ type: actionTypes.CHANGE_SEARCH_TEXT, payload: text });
    }
}