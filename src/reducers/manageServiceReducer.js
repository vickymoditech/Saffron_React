import {
    SERVICE_INPROGRESS,
    SERVICE_NOT_SUCCESS,
    SERVICE_SUCCESS,
    SERVICE_DELETE_SUCCESS,
    SERVICE_CONNECTION_ERROR
} from '../constants/actionTypes';


import initialState from './initialState';

export default function manageServiceReducer(state = initialState.manageServiceReducer, action) {
    switch (action.type) {

        case SERVICE_INPROGRESS:
            return Object.assign({}, state, {Loading: true, error_msg: null, success_msg: null});

        case SERVICE_CONNECTION_ERROR:
            return Object.assign({}, state, {
                serviceList: [],
                Loading: false,
                error_msg: action.data.error_msg,
                success_msg: null
            });

        case SERVICE_NOT_SUCCESS:
            return Object.assign({}, state, {
                serviceList: [],
                error_msg: action.data.error_msg,
                Loading: false,
                success_msg: null,
            });

        case SERVICE_SUCCESS:
            return Object.assign({}, state, {
                serviceList: action.data,
                Loading: false,
                error_msg: null,
                success_msg: null,
            });

        case SERVICE_DELETE_SUCCESS:

            let removeService = state.serviceList.find(function (services) {
                return services.id === action.data.id;
            });
            let index = state.serviceList.indexOf(removeService);
            state.serviceList.splice(index, 1);

            return Object.assign({}, state, {
                serviceList: state.serviceList,
                Loading: false,
                error_msg: null,
                success_msg: action.data.result
            });


        default:
            return state;
    }
};
