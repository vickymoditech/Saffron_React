import axios from 'axios';
import ENVIRONMENT_VARIABLES from '../environment.config';
import {
    WEBSITE_INPROGRESS,
    TEAM_SUCCESS,
    WEBSITE_CONNECTION_ERROR,
    WEBSITE_NOT_SUCCESS
} from '../constants/actionTypes';

export const getTeamList = () => {
    try {
        return (dispatch) => {

            dispatch({type: WEBSITE_INPROGRESS});
            const api = {
                method: 'GET',
                url: ENVIRONMENT_VARIABLES.API_URL + "/Teams"
            };
            axios(api).then((response) => {
                if (response.status === 200) {
                    dispatch({type: TEAM_SUCCESS, data: response.data});
                }
            }).catch((error) => {
                debugger;
                if (error && error.response && (error.response.status === 400 || error.response.status === 403 || error.response.status === 401)) {
                    dispatch({type: WEBSITE_NOT_SUCCESS, data: {error_msg: error.response.data.user_msg}});
                } else {
                    dispatch({type: WEBSITE_CONNECTION_ERROR, data: {error_msg: error.message.toString()}});
                }
            });
        }
    } catch (error) {
        alert(error.message.toString());
    }

};
