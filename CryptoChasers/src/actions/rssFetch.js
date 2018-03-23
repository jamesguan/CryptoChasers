import { actionTypes } from "./actionTypes";
import { rssRequest } from "../api/rssRequest";
export const rssFetch = () => {
    console.log("gets here too!")
    return dispatch => {
        dispatch({ type: actionTypes.FETCH_RSS_INIT });
        let makeRequest = async () => {
            let rssData = await rssRequest();
            dispatch({ type: actionTypes.FETCH_RSS_RECEIVED, payload: rssData})
            return rssData;
        }
        makeRequest();
    }
}