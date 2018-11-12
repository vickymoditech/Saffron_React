import {
    SOD_INPROGRESS,
    SOD_NOT_SUCCESS,
    SOD_SUCCESS,
    SOD_CONNECTION_ERROR
} from '../constants/actionTypes';


import initialState from './initialState';

export default function saffronOrdersDisplayReducer(state = initialState.saffronOrdersDisplayReducer, action) {
    switch (action.type) {

        case SOD_INPROGRESS:
            return Object.assign({}, state, {Loading: true});

        case SOD_CONNECTION_ERROR:
            return Object.assign({}, state, {userList: [], Loading: false, error_msg: action.data.error_msg});

        case SOD_NOT_SUCCESS:
            return Object.assign({}, state, {
                userList: [],
                error_msg: action.data.error_msg,
                Loading: false
            });

        case SOD_SUCCESS:
            return Object.assign({}, state, {
                runningOrder: action.runningOrder,
                runningLate: action.runningLate,
                recentOrders: action.recentOrders,
                Loading: false,
                error_msg: null
            });

        default:
            return state;
    }
};
