import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import authReducer from './authReducer';
import manageUserReducer from './manageUserReducer';

const rootReducer = combineReducers({
    authReducer,
    manageUserReducer,
    routing: routerReducer
});

export default rootReducer;
