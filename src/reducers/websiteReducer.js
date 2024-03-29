import {browserHistory} from 'react-router';
import {
    WEBSITE_INPROGRESS,
    WEBSITE_NOT_SUCCESS,
    WEBSITE_CONNECTION_ERROR,
    ALL_GALLERY_SUCCESS,
    ALL_SLIDER_SUCCESS,
    WEBSITE_HOME,
    LOGOUT_USER
} from '../constants/actionTypes';
import {disconnect} from '../socket';


import initialState from './initialState';

export default function websiteReducer(state = initialState.websiteReducer, action) {
    switch (action.type) {

        case WEBSITE_INPROGRESS:
            return Object.assign({}, state, {Loading: true});

        case WEBSITE_CONNECTION_ERROR:
            return Object.assign({}, state, {Loading: false, error_msg: action.data.error_msg});

        case WEBSITE_NOT_SUCCESS:
            return Object.assign({}, state, {
                error_msg: action.data.error_msg,
                Loading: false
            });

        case ALL_GALLERY_SUCCESS:
            return Object.assign({}, state, {
                allGalleryList: action.data,
                Loading: false,
                error_msg: null
            });

        case WEBSITE_HOME:
            return Object.assign({}, state, {
                sliderList: action.SliderList,
                serviceList: action.ServicesList,
                galleryList: action.GalleryList,
                teamList: action.TeamList,
                Loading: false,
                error_msg: null
            });

        case LOGOUT_USER:
            disconnect();
            browserHistory.push('/');
            return Object.assign({}, state, {
                Loading: false,
            });

        default:
            return state;
    }
};
