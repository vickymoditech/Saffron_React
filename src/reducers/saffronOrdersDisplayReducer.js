import {
    SOD_INPROGRESS,
    SOD_NOT_SUCCESS,
    SOD_SUCCESS,
    SOD_CONNECTION_ERROR,
    SOD_RUNNING_LATE_MOVE_TO_PROGRESS,
    SOD_RECENT_MOVE_TO_PROGRESS
} from '../constants/actionTypes';


import initialState from './initialState';

export default function saffronOrdersDisplayReducer(state = initialState.saffronOrdersDisplayReducer, action) {
    switch (action.type) {

        case SOD_INPROGRESS:
            return Object.assign({}, state, {Loading: true});

        case SOD_CONNECTION_ERROR:
            return Object.assign({}, state, {userList: [], Loading: false, error_msg: action.data.error_msg});

        case SOD_NOT_SUCCESS:
            return Object.assign({}, state, {
                userList: [],
                error_msg: action.data.error_msg,
                Loading: false
            });

        case SOD_SUCCESS:
            return Object.assign({}, state, {
                runningOrder: action.runningOrder,
                runningLate: action.runningLate,
                recentOrders: action.recentOrders,
                Loading: false,
                error_msg: null
            });

        case SOD_RUNNING_LATE_MOVE_TO_PROGRESS:
            debugger;
            //Add into Running Order
            let runningOrders = [...state.runningOrder, action.order];

            //remove Running Late Order
            let removeOrder = state.runningLate.find(function (runningLateOrder) {
                return runningLateOrder.orderNo === action.order.orderNo;
            });
            let index = state.runningLate.indexOf(removeOrder);
            state.runningLate.splice(index, 1);

            return Object.assign({}, state, {
                runningOrder: runningOrders,
                runningLate: state.runningLate
            });

        case SOD_RECENT_MOVE_TO_PROGRESS:
            debugger;
            //Add into Running Order
            runningOrders = [...state.runningOrder, action.order];

            //remove Recent Order
            removeOrder = state.recentOrders.find(function (recentOrder) {
                return recentOrder.orderNo === action.order.orderNo;
            });
            index = state.recentOrders.indexOf(removeOrder);
            state.recentOrders.splice(index, 1);

            return Object.assign({}, state, {
                runningOrder: runningOrders,
                recentOrders: state.recentOrders
            });

        default:
            return state;
    }
};
