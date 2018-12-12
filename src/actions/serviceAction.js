import axios from 'axios';
import ENVIRONMENT_VARIABLES from '../environment.config';
import {
    SERVICE_INPROGRESS,
    SERVICE_NOT_SUCCESS,
    SERVICE_SUCCESS,
    SERVICE_DELETE_SUCCESS,
    SERVICE_CONNECTION_ERROR,
} from '../constants/actionTypes';

export const ServiceList = () => {
    try {
        return (dispatch) => {
            dispatch({type: SERVICE_INPROGRESS});
            const token = "Bearer " + localStorage.getItem('accessToken');

            let api = {
                method: 'GET',
                headers: {'Authorization': token},
                url: ENVIRONMENT_VARIABLES.API_URL + "/Services"
            };

            axios(api).then((response) => {
                if (response.status === 200) {
                    dispatch({type: SERVICE_SUCCESS, data: response.data});
                }
            }).catch((error) => {
                if (error && error.response && (error.response.status === 400 || error.response.status === 403 || error.response.status === 401)) {
                    dispatch({type: SERVICE_NOT_SUCCESS, data: {error_msg: error.response.data.user_msg}});
                } else {
                    dispatch({type: SERVICE_CONNECTION_ERROR, data: {error_msg: error.message.toString()}});
                }
            });
        }
    } catch (error) {
        alert(error.message.toString());
    }
};

export const ServiceDelete = (ServiceId) => {
    try {
        return (dispatch) => {
            dispatch({type: SERVICE_INPROGRESS});
            const token = "Bearer " + localStorage.getItem('accessToken');

            let api = {
                method: 'DELETE',
                headers: {'Authorization': token},
                url: ENVIRONMENT_VARIABLES.API_URL + "/Services/" + ServiceId
            };

            axios(api).then((response) => {
                if (response.status === 200) {
                    dispatch({type: SERVICE_DELETE_SUCCESS, data: response.data});
                }
            }).catch((error) => {
                if (error && error.response && (error.response.status === 400 || error.response.status === 403 || error.response.status === 401)) {
                    dispatch({type: SERVICE_NOT_SUCCESS, data: {error_msg: error.response.data.user_msg}});
                } else {
                    dispatch({type: SERVICE_CONNECTION_ERROR, data: {error_msg: error.message.toString()}});
                }
            });
        }
    } catch (error) {
        alert(error.message.toString());
    }
};

