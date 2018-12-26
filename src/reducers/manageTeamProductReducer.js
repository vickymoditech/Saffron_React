import {
    TEAMPRODUCT_INPROGRESS,
    TEAMPRODUCT_NOT_SUCCESS,
    TEAMPRODUCT_SUCCESS,
    TEAMPRODUCT_CONNECTION_ERROR,
} from '../constants/actionTypes';


import initialState from './initialState';

export default function manageTeamProductReducer(state = initialState.manageTeamProductReducer, action) {
    switch (action.type) {

        case TEAMPRODUCT_INPROGRESS:
            return Object.assign({}, state, {Loading: true, error_msg: null, success_msg: null});

        case TEAMPRODUCT_CONNECTION_ERROR:
            return Object.assign({}, state, {
                serviceList: [],
                Loading: false,
                error_msg: action.data.error_msg,
                success_msg: null
            });

        case TEAMPRODUCT_NOT_SUCCESS:
            return Object.assign({}, state, {
                error_msg: action.data.error_msg,
                Loading: false,
                success_msg: null,
            });

        case TEAMPRODUCT_SUCCESS:
            return Object.assign({}, state, {
                allProductList: action.data,
                Loading: false,
                error_msg: null,
                success_msg: null,
            });


        default:
            return state;
    }
};
