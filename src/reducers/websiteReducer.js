import {
    WEBSITE_INPROGRESS,
    TEAM_SUCCESS,
    WEBSITE_NOT_SUCCESS,
    WEBSITE_CONNECTION_ERROR,
    GALLERY_SUCCESS,
    SERVICE_SUCCESS,
    ALL_GALLERY_SUCCESS,
    ALL_SLIDER_SUCCESS,
    WEBSITE_HOME,
} from '../constants/actionTypes';


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

        default:
            return state;
    }
};
