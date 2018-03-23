import { combineReducers } from "redux";
import { rssReducer } from "./rssReducer";

export const rootReducer = combineReducers({
    rssReducer: rssReducer
});