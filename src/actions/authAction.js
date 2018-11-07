import axios from 'axios';
import ENVIRONMENT_VARIABLES from '../environment.config';
import {
    INVALID_USER,
    AUTHENTICATION_INPROGRESS,
    IS_AUTHENTICATED,
    UNAUTHORIZED_USER,
    LOGOUT_USER,
    CONNECTION_ERROR,
    PASSWORD_CHANGE_INPROGRESS,
    PASSWORD_CHANGE_SUCCESS,
    PASSWORD_CHANGE_NOT_SUCCESS,
    PASSWORD_CONNECTION_ERROR
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
                } else {
                    dispatch({type: CONNECTION_ERROR, data: {error_msg: error.message.toString()}});
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
            dispatch({type: LOGOUT_USER});
        }
    } catch (error) {
    }
};

export const changePassword = (changePasswordData) => {
        try {
            return (dispatch) => {

                dispatch({type: PASSWORD_CHANGE_INPROGRESS});

                const token = "Bearer " + localStorage.getItem('accessToken');
                let userProfile = JSON.parse(localStorage.getItem('userProfile'));

                const first_name = userProfile.first_name;
                const last_name = userProfile.last_name;
                const contact_no = userProfile.userId;
                const password = userProfile.password;

                if (password.toString() === changePasswordData.currentPassword.toString()) {
                    const changePasswordDetail = {
                        "first_name": first_name,
                        "last_name": last_name,
                        "mobile_number": contact_no,
                        "password": changePasswordData.newPassword,
                        "confirm_password": changePasswordData.newPassword,
                        "block": false,
                    };
                    const api = {
                        method: 'PUT',
                        headers: {'Authorization': token},
                        url: ENVIRONMENT_VARIABLES.API_URL + "/oauths",
                        data: changePasswordDetail,
                    };
                    axios(api).then((response) => {
                        if (response.status === 200) {
                            dispatch({type: PASSWORD_CHANGE_SUCCESS, data: response.data});
                        }
                    }).catch((error) => {
                        if (error && error.response && error.response.status === 400) {
                            dispatch({type: PASSWORD_CHANGE_NOT_SUCCESS, data: error.response.data});
                        } else {
                            dispatch({type: PASSWORD_CONNECTION_ERROR, data: {error_msg: error.message.toString()}});
                        }
                    });
                } else {
                    dispatch({type: PASSWORD_CHANGE_NOT_SUCCESS, data: {user_msg: 'Current Password is Invalid'}});
                }
            }
        }
        catch (error) {

        }
    }
;