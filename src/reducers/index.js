import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import authReducer from './authReducer';
import manageUserReducer from './manageUserReducer';
import saffronOrdersDisplayReducer from './saffronOrdersDisplayReducer';
import websiteReducer from './websiteReducer';

const rootReducer = combineReducers({
    authReducer,
    manageUserReducer,
    saffronOrdersDisplayReducer,
    websiteReducer,
    routing: routerReducer
});

export default rootReducer;
