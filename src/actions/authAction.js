import axios from 'axios';
import ENVIRONMENT_VARIABLES from '../environment.config';
import {
    INVALID_USER,
    AUTHENTICATION_INPROGRESS,
    IS_AUTHENTICATED,
    UNAUTHORIZED_USER,
    CONNECTION_ERROR
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
            dispatch({type: UNAUTHORIZED_USER});
        }
    } catch (error) {
    }
};

/*export const changePassword = (changePasswordData) => {
    try{
        return (dispatch) => {
            const token = 'Bearer ' + localStorage.getItem('accessToken');
            const first_name = localStorage.getItem('userProfile').first_name;
            const first_name = localStorage.getItem('userProfile').first_name;
            const first_name = localStorage.getItem('userProfile').first_name;

            const changePasswordDetail = {
                "first_name":"demo",
                "last_name":"demo",
                "mobile_number":"8401060121",
                "password":"demo123",
                "confirm_password":"demo123",
                "block": false,
                "oldPassword": changePasswordData.currentPassword,
                "newPassword": changePasswordData.newPassword
            };
            const api = {
                method: 'put',
                url: ENVIRONMENT_VARIABLES.API_URL + "/oauths",
                data: changePasswordDetail,
                headers: {'Authorization': token}
            };
            axios(api).then((response) => {
                if (response.status === 200) {
                    dispatch({type: PASSWORD_CHANGE_SUCCESS, data: response.data});
                }
            }).catch((error) => {
                if (error.response.status === 400) {
                    dispatch({type: PASSWORD_CHANGE_NOT_SUCCESS, data: error.response.data});
                }
            });
        }
    }catch (error){

    }
};*/