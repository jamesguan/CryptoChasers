import { actionTypes } from "../actions/actionTypes";

const KEYS_TO_FILTERS = ['title', 'description'];
import { createFilter } from 'react-native-search-filter';

const initialState = {
    rss: { title: "", items: [] },
    filteredContent: null,
    searchTerm: '',
    init: false,
    fetching: false,
    fetched: false,
    error: null,
}

export const rssReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_RSS_INIT: {
            return {...state, init: true};
        }
        case actionTypes.FETCH_RSS_PROGRESS: {
            return {...state, fetching: true, init: false};
        }
        case actionTypes.FETCH_RSS_RECEIVED: {
            return {...state, 
                    fetching: false, 
                    init: false, 
                    fetched: true, 
                    rss: action.payload.rss, 
                    filteredContent: action.payload.filteredContent };
        }
        case actionTypes.RESET_RSS_STATE: {
            return initialState;
        }
        case actionTypes.CHANGE_SEARCH_TEXT: {
            const filteredContent = state.rss.items.filter(createFilter(action.payload, KEYS_TO_FILTERS));
            return {...state, searchTerm: action.payload, filteredContent: filteredContent };
        }
        case actionTypes.CLEAR_SEARCH_TEXT: {
            return {...state, searchTerm: ""}
        }
        default: {
            return {...state}
        }
    }
}