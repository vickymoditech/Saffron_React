import axios from 'axios';
import ENVIRONMENT_VARIABLES from '../environment.config';
import {
    USER_INPROGRESS,
    USER_CHANGE_NOT_SUCCESS,
    USER_SUCCESS,
    USER_CONNECTION_ERROR,
} from '../constants/actionTypes';

export const UserList = () => {
    try {
        return (dispatch) => {
            dispatch({type: USER_INPROGRESS});
            const token = "Bearer " + localStorage.getItem('accessToken');

            const api = {
                method: 'GET',
                headers: {'Authorization': token},
                url: ENVIRONMENT_VARIABLES.API_URL + "/oauths"
            };
            axios(api).then((response) => {
                if (response.status === 200) {
                    dispatch({type: USER_SUCCESS, data: response.data});
                }
            }).catch((error) => {
                if (error && error.response && (error.response.status === 400 || error.response.status === 403 || error.response.status === 401)) {
                    dispatch({type: USER_CHANGE_NOT_SUCCESS, data: {error_msg: error.response.data.user_msg}});
                } else {
                    dispatch({type: USER_CONNECTION_ERROR, data: {error_msg: error.message.toString()}});
                }
            });
        }
    } catch (error) {
        alert(error.message.toString());
    }
};