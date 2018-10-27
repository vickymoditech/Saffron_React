import axios from 'axios';
import ENVIRONMENT_VARIABLES from '../environment.config';
import {
    INVALID_USER,
    AUTHENTICATION_INPROGRESS,
    IS_AUTHENTICATED,
} from '../constants/actionTypes';

export const loginUser = (credentials) => {
    try {

        return (dispatch) => {
            const loginDetails = {
                "userName": credentials.email,
                "password": credentials.password
            };
            dispatch({type: AUTHENTICATION_INPROGRESS});
            setTimeout(function () {
                if (loginDetails.userName === 'admin' && loginDetails.password === 'admin') {
                    dispatch({
                        type: IS_AUTHENTICATED,
                        data: {accessToken: 'demoAccessTokens', userProfile: 'UserProfile'}
                    });
                } else
                    dispatch({type: INVALID_USER, data: {error_msg: 'Invalid User Login'}});

            }, 3000);
        }
    } catch (error) {
        // GyGLog.writeLog(GyGLog.eLogLevel.debug,"","Auth Action loginuser : " + error.message);
    }

};