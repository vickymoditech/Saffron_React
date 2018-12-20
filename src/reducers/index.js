import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import authReducer from './authReducer';
import manageUserReducer from './manageUserReducer';
import saffronOrdersDisplayReducer from './saffronOrdersDisplayReducer';
import websiteReducer from './websiteReducer';
import manageServiceReducer from './manageServiceReducer';
import manageTeamReducer from './manageTeamReducer';
import manageGalleryReducer from './manageGalleryReducer';

const rootReducer = combineReducers({
    authReducer,
    manageUserReducer,
    saffronOrdersDisplayReducer,
    websiteReducer,
    manageServiceReducer,
    manageTeamReducer,
    manageGalleryReducer,
    routing: routerReducer
});

export default rootReducer;
