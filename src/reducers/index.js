import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import authReducer from './authReducer';
import manageUserReducer from './manageUserReducer';
import saffronOrdersDisplayReducer from './saffronOrdersDisplayReducer';
import websiteReducer from './websiteReducer';
import manageServiceReducer from './manageServiceReducer';
import manageTeamReducer from './manageTeamReducer';
import manageGalleryReducer from './manageGalleryReducer';
import manageSliderReducer from './manageSliderReducer';
import manageTeamProductReducer from './manageTeamProductReducer';

const rootReducer = combineReducers({
    authReducer,
    manageUserReducer,
    saffronOrdersDisplayReducer,
    websiteReducer,
    manageServiceReducer,
    manageTeamReducer,
    manageGalleryReducer,
    manageSliderReducer,
    manageTeamProductReducer,
    routing: routerReducer
});

export default rootReducer;
