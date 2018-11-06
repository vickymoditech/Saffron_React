import {browserHistory} from 'react-router';
import decode from 'jwt-decode';
import {
    USER_INPROGRESS,
    USER_CHANGE_NOT_SUCCESS,
    USER_SUCCESS,
    USER_CONNECTION_ERROR
} from '../constants/actionTypes';
import _ from 'lodash';

import initialState from './initialState';

export default function authReducer(state = initialState.manageUserReducer, action) {
    switch (action.type) {

        case USER_CONNECTION_ERROR:
            return Object.assign({}, state, {userList: [], Loading: false, error_msg: action.data.error_msg});

        case USER_INPROGRESS:
            return Object.assign({}, state, {Loading: true});


        case USER_CHANGE_NOT_SUCCESS:
            return Object.assign({}, state, {
                userList: [],
                error_Msg: action.data.user_msg,
                Loading: false
            });

        case USER_SUCCESS:

            return Object.assign({}, state, {
                userList: action.data.userList,
                successMsg: action.data.result,
                Loading: false
            });


        default:
            return state;
    }
};
