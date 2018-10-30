import axios from 'axios';
import ENVIRONMENT_VARIABLES from '../environment.config';
import {
    INVALID_USER,
    AUTHENTICATION_INPROGRESS,
    IS_AUTHENTICATED,
    UNAUTHORIZED_USER
} from '../constants/actionTypes';

export const loginUser = (credentials) => {
    try {

        return (dispatch) => {
            const loginDetails = {
                "userId": credentials.email,
                "password": credentials.password
            };
            dispatch({type: AUTHENTICATION_INPROGRESS});
            axios.post(ENVIRONMENT_VARIABLES.API_URL + "/oauths/login", loginDetails).then((response) => {
                if (response.status === 200) {
                    dispatch({
                        type: IS_AUTHENTICATED,
                        data: {accessToken: response.data.accessToken}
                    });
                }
            }).catch((error) => {
                if (error.response) {
                    dispatch({type: INVALID_USER, data: {error_msg: error.response.data.user_msg}});
                }
            });
        }
    } catch (error) {
    }

};

export const loggedOut = () => {
    try {
        return (dispatch) => {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("userProfile");
            dispatch({type: UNAUTHORIZED_USER});
        }
    } catch (error) {
    }
};
