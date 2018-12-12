import axios from 'axios';
import ENVIRONMENT_VARIABLES from '../environment.config';
import {
    TEAM_INPROGRESS,
    TEAM_NOT_SUCCESS,
    TEAM_SUCCESS,
    TEAM_DELETE_SUCCESS,
    TEAM_CONNECTION_ERROR,
} from '../constants/actionTypes';

export const TeamList = () => {
    try {
        return (dispatch) => {
            dispatch({type: TEAM_INPROGRESS});
            const token = "Bearer " + localStorage.getItem('accessToken');

            let api = {
                method: 'GET',
                headers: {'Authorization': token},
                url: ENVIRONMENT_VARIABLES.API_URL + "/Teams"
            };

            axios(api).then((response) => {
                if (response.status === 200) {
                    dispatch({type: TEAM_SUCCESS, data: response.data});
                }
            }).catch((error) => {
                if (error && error.response && (error.response.status === 400 || error.response.status === 403 || error.response.status === 401)) {
                    dispatch({type: TEAM_NOT_SUCCESS, data: {error_msg: error.response.data.user_msg}});
                } else {
                    dispatch({type: TEAM_CONNECTION_ERROR, data: {error_msg: error.message.toString()}});
                }
            });
        }
    } catch (error) {
        alert(error.message.toString());
    }
};

export const TeamDelete = (ServiceId) => {
    try {
        return (dispatch) => {
            dispatch({type: TEAM_INPROGRESS});
            const token = "Bearer " + localStorage.getItem('accessToken');

            let api = {
                method: 'DELETE',
                headers: {'Authorization': token},
                url: ENVIRONMENT_VARIABLES.API_URL + "/Teams/" + ServiceId
            };

            axios(api).then((response) => {
                if (response.status === 200) {
                    dispatch({type: TEAM_DELETE_SUCCESS, data: response.data});
                }
            }).catch((error) => {
                if (error && error.response && (error.response.status === 400 || error.response.status === 403 || error.response.status === 401)) {
                    dispatch({type: TEAM_NOT_SUCCESS, data: {error_msg: error.response.data.user_msg}});
                } else {
                    dispatch({type: TEAM_CONNECTION_ERROR, data: {error_msg: error.message.toString()}});
                }
            });
        }
    } catch (error) {
        alert(error.message.toString());
    }
};
