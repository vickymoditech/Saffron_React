import {browserHistory} from 'react-router';
import {
    INVALID_USER,
    AUTHENTICATION_INPROGRESS,
    IS_AUTHENTICATED
} from '../constants/actionTypes';
import _ from 'lodash';


import initialState from './initialState';

export default function authReducer(state = initialState.authReducer, action) {
    switch (action.type) {
        case INVALID_USER:
            return Object.assign({}, state, {invalidUser: true, loading: false, error_msg: action.data.error_msg});
        case AUTHENTICATION_INPROGRESS:
            return Object.assign({}, state, {invalidUser: false, loading: true});
        case IS_AUTHENTICATED:
            let isAuthenticated = _.cloneDeep({
                isAuthenticated: true,
                loading: false,
                userProfile: action.data.userProfile,
                userAvatar: action.data.userProfile.userAvatar
            });
            return Object.assign({}, state, isAuthenticated);
        default:
            return state;
    }
};
