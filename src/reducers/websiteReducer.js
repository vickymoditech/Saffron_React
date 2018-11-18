import {
    WEBSITE_INPROGRESS,
    TEAM_SUCCESS,
    WEBSITE_NOT_SUCCESS,
    WEBSITE_CONNECTION_ERROR
} from '../constants/actionTypes';


import initialState from './initialState';

export default function websiteReducer(state = initialState.websiteReducer, action) {
    switch (action.type) {

        case WEBSITE_INPROGRESS:
            return Object.assign({}, state, {Loading: true});

        case WEBSITE_CONNECTION_ERROR:
            return Object.assign({}, state, {Loading: false, error_msg: action.data.error_msg});

        case WEBSITE_NOT_SUCCESS:
            debugger;
            return Object.assign({}, state, {
                error_msg: action.data.error_msg,
                Loading: false
            });

        case TEAM_SUCCESS:
            return Object.assign({}, state, {
                teamList: action.data,
                Loading: false,
                error_msg: null
            });

        default:
            return state;
    }
};
