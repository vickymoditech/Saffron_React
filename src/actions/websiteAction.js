import axios from 'axios';
import ENVIRONMENT_VARIABLES from '../environment.config';
import {
    WEBSITE_INPROGRESS,
    WEBSITE_CONNECTION_ERROR,
    WEBSITE_NOT_SUCCESS,
    ALL_GALLERY_SUCCESS,
    WEBSITE_HOME,
    LOGOUT_USER
} from '../constants/actionTypes';

export const getWebsiteHome = () => {
    try {
        return (dispatch) => {

            dispatch({type: WEBSITE_INPROGRESS});

            axios.all([
                axios.get(ENVIRONMENT_VARIABLES.API_URL + '/SliderImages'),
                axios.get(ENVIRONMENT_VARIABLES.API_URL + '/Services'),
                axios.get(ENVIRONMENT_VARIABLES.API_URL + '/Gallerys'),
                axios.get(ENVIRONMENT_VARIABLES.API_URL + '/Teams')
            ]).then(axios.spread((SliderList, ServicesList, GalleryList, TeamList) => {
                dispatch({
                    type: WEBSITE_HOME,
                    SliderList: SliderList.data,
                    ServicesList: ServicesList.data,
                    GalleryList: GalleryList.data,
                    TeamList: TeamList.data
                });
            })).catch((error) => {
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


export const getAllGallerys = () => {
    try {
        return (dispatch) => {
            dispatch({type: WEBSITE_INPROGRESS});
            const api = {
                method: 'GET',
                url: ENVIRONMENT_VARIABLES.API_URL + "/Gallerys/All"
            };
            axios(api).then((response) => {
                if (response.status === 200) {
                    dispatch({type: ALL_GALLERY_SUCCESS, data: response.data});
                }
            }).catch((error) => {
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

export const loggedOut = () => {
    try {
        return (dispatch) => {
            dispatch({type: WEBSITE_INPROGRESS});
            localStorage.removeItem('accessToken');
            localStorage.removeItem('userProfile');
            localStorage.removeItem('userAvatar');
            dispatch({type: LOGOUT_USER});
        }
    } catch (error) {
    }
};

