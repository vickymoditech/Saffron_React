import {browserHistory} from 'react-router';
import decode from 'jwt-decode';
import {
    INVALID_USER,
    AUTHENTICATION_INPROGRESS,
    IS_AUTHENTICATED,
    UNAUTHORIZED_USER,
    CONNECTION_ERROR,
    PASSWORD_CHANGE_INPROGRESS,
    PASSWORD_CHANGE_NOT_SUCCESS,
    PASSWORD_CHANGE_SUCCESS,
    PASSWORD_CONNECTION_ERROR,
    REGISTRATION_SUCCESS,
    REGISTRATION_NOT_SUCCESS,
    REGISTRATION_INPROGRESS
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
            browserHistory.push('/Login');
            return Object.assign({}, initialState, {loading: false});


        case CONNECTION_ERROR:
            return Object.assign({}, state, {invalidUser: true, loading: false, error_msg: action.data.error_msg});

        case PASSWORD_CHANGE_INPROGRESS:
            return Object.assign({}, state, {isPasswordChanged: false, changePasswordLoading: true});

        case PASSWORD_CHANGE_NOT_SUCCESS:
            return Object.assign({}, state, {
                isPasswordChanged: false,
                errMsg: action.data.user_msg,
                changePasswordLoading: false
            });

        case PASSWORD_CHANGE_SUCCESS:

            localStorage.removeItem('accessToken');
            localStorage.removeItem('userProfile');
            localStorage.removeItem('userAvatar');

            userProfile = decode(action.data.accessToken);
            userAvatar = userProfile.user.image_url;

            localStorage.setItem("accessToken", action.data.accessToken);
            localStorage.setItem("userProfile", JSON.stringify(userProfile.user));
            localStorage.setItem("userAvatar", userAvatar);

            return Object.assign({}, state, {
                isPasswordChanged: true,
                successMsg: action.data.result,
                changePasswordLoading: false
            });

        case PASSWORD_CONNECTION_ERROR:
            return Object.assign({}, state, {
                isPasswordChanged: false,
                errMsg: action.data.error_msg,
                changePasswordLoading: false
            });

        case REGISTRATION_INPROGRESS:
            debugger;
            return Object.assign({}, state, {isRegistration: false, loading: true});

        case REGISTRATION_NOT_SUCCESS:
            debugger;
            return Object.assign({}, state, {
                isRegistration: false,
                error_msg: action.data.error_msg,
                loading: false
            });

        case REGISTRATION_SUCCESS:
            debugger;
            localStorage.removeItem('accessToken');
            localStorage.removeItem('userProfile');
            localStorage.removeItem('userAvatar');

            userProfile = decode(action.data.accessToken);
            userAvatar = userProfile.user.image_url;

            localStorage.setItem("accessToken", action.data.accessToken);
            localStorage.setItem("userProfile", JSON.stringify(userProfile.user));
            localStorage.setItem("userAvatar", userAvatar);

            return Object.assign({}, state, {
                isRegistration: true,
                success_msg: action.data.result,
                loading: false
            });

        default:
            return state;
    }
};
