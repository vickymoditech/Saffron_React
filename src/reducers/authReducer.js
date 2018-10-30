import {browserHistory} from 'react-router';
import decode from 'jwt-decode';
import {
    INVALID_USER,
    AUTHENTICATION_INPROGRESS,
    IS_AUTHENTICATED,
    UNAUTHORIZED_USER
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

            let userProfile = decode(action.data.accessToken);
            let userAvatar = userProfile.user.image_url;

            localStorage.setItem("accessToken", action.data.accessToken);
            localStorage.setItem("userProfile", JSON.stringify(userProfile.user));
            localStorage.setItem("userAvatar", userAvatar);
            let isAuthenticated = _.cloneDeep({
                isAuthenticated: true,
                loading: false,
                accessToken: action.data.accessToken,
                userProfile: userProfile.user,
                userAvatar: userAvatar
            });
            return Object.assign({}, state, isAuthenticated);

        case UNAUTHORIZED_USER:

            localStorage.removeItem('accessToken');
            localStorage.removeItem('userProfile');
            localStorage.removeItem('userAvatar');
            browserHistory.push('/login');
            return Object.assign({}, initialState, {loading: false});

        default:
            return state;
    }
};
