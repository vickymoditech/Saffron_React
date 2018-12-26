import axios from 'axios';
import ENVIRONMENT_VARIABLES from '../environment.config';
import {
    TEAMPRODUCT_INPROGRESS,
    TEAMPRODUCT_NOT_SUCCESS,
    TEAMPRODUCT_SUCCESS,
    TEAMPRODUCT_CONNECTION_ERROR,
} from '../constants/actionTypes';

export const ProductList = () => {
    try {
        return (dispatch) => {
            dispatch({type: TEAMPRODUCT_INPROGRESS});
            const token = "Bearer " + localStorage.getItem('accessToken');

            let api = {
                method: 'GET',
                headers: {'Authorization': token},
                url: ENVIRONMENT_VARIABLES.API_URL + "/Products/allProduct"
            };

            axios(api).then((response) => {
                if (response.status === 200) {
                    dispatch({type: TEAMPRODUCT_SUCCESS, data: response.data});
                }
            }).catch((error) => {
                if (error && error.response && (error.response.status === 400 || error.response.status === 403 || error.response.status === 401)) {
                    dispatch({type: TEAMPRODUCT_NOT_SUCCESS, data: {error_msg: error.response.data.user_msg}});
                } else {
                    dispatch({type: TEAMPRODUCT_CONNECTION_ERROR, data: {error_msg: error.message.toString()}});
                }
            });
        }
    } catch (error) {
        alert(error.message.toString());
    }
};