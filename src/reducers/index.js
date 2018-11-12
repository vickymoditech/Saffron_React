import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import authReducer from './authReducer';
import manageUserReducer from './manageUserReducer';
import saffronOrdersDisplayReducer from './saffronOrdersDisplayReducer';

const rootReducer = combineReducers({
    authReducer,
    manageUserReducer,
    saffronOrdersDisplayReducer,
    routing: routerReducer
});

export default rootReducer;
