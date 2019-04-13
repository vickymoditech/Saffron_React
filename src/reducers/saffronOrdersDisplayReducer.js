import {
    SOD_INPROGRESS,
    SOD_NOT_SUCCESS,
    SOD_SUCCESS,
    SOD_CONNECTION_ERROR,
    SOD_RUNNING_LATE_MOVE_TO_PROGRESS,
    SOD_RECENT_MOVE_TO_PROGRESS,
    SOD_RECENT_NEW_ORDER,
    SOD_MOVE_TO_RUNNING_LATE
} from '../constants/actionTypes';


import initialState from './initialState';

let moment = require('moment-timezone');

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

            action.data.recentOrders.forEach((OrderSingle) => {
                let BookingDateTime = moment.tz(OrderSingle.bookingDateTime, 'Asia/Kolkata').format();
                let BookingStartTime = moment.tz(OrderSingle.bookingStartTime, 'Asia/Kolkata').format();
                let BookingEndTime = moment.tz(OrderSingle.bookingEndTime, 'Asia/Kolkata').format();
                OrderSingle.bookingDateTime = new Date(BookingDateTime);
                OrderSingle.bookingStartTime = new Date(BookingStartTime);
                OrderSingle.bookingEndTime = new Date(BookingEndTime);
            });

            action.data.runningOrder.forEach((OrderSingle) => {
                let BookingDateTime = moment.tz(OrderSingle.bookingDateTime, 'Asia/Kolkata').format();
                let BookingStartTime = moment.tz(OrderSingle.bookingStartTime, 'Asia/Kolkata').format();
                let BookingEndTime = moment.tz(OrderSingle.bookingEndTime, 'Asia/Kolkata').format();
                OrderSingle.bookingDateTime = new Date(BookingDateTime);
                OrderSingle.bookingStartTime = new Date(BookingStartTime);
                OrderSingle.bookingEndTime = new Date(BookingEndTime);
            });

            action.data.runningLate.forEach((OrderSingle) => {
                let BookingDateTime = moment.tz(OrderSingle.bookingDateTime, 'Asia/Kolkata').format();
                let BookingStartTime = moment.tz(OrderSingle.bookingStartTime, 'Asia/Kolkata').format();
                let BookingEndTime = moment.tz(OrderSingle.bookingEndTime, 'Asia/Kolkata').format();
                OrderSingle.bookingDateTime = new Date(BookingDateTime);
                OrderSingle.bookingStartTime = new Date(BookingStartTime);
                OrderSingle.bookingEndTime = new Date(BookingEndTime);
            });

            return Object.assign({}, state, {
                runningOrder: action.data.runningOrder,
                runningLate: action.data.runningLate,
                recentOrders: action.data.recentOrders,
                Loading: false,
                error_msg: null
            });

        case SOD_RUNNING_LATE_MOVE_TO_PROGRESS:
            //Add into Running Order
            let runningOrders = [...state.runningOrder, action.order];

            //remove Running Late Order
            let removeOrder = state.runningLate.find(function (runningLateOrder) {
                return runningLateOrder.id === action.order.id;
            });
            let index = state.runningLate.indexOf(removeOrder);
            state.runningLate.splice(index, 1);

            return Object.assign({}, state, {
                runningOrder: runningOrders,
                runningLate: state.runningLate
            });

        case SOD_RECENT_MOVE_TO_PROGRESS:
            //Add into Running Order
            runningOrders = [...state.runningOrder, action.order];

            //remove Recent Order
            removeOrder = state.recentOrders.find(function (recentOrder) {
                return recentOrder.id === action.order.id;
            });
            index = state.recentOrders.indexOf(removeOrder);
            state.recentOrders.splice(index, 1);

            return Object.assign({}, state, {
                runningOrder: runningOrders,
                recentOrders: state.recentOrders
            });

        case SOD_RECENT_NEW_ORDER:

            let BookingDateTime = moment.tz(action.order.bookingDateTime, 'Asia/Kolkata').format();
            let BookingStartTime = moment.tz(action.order.bookingStartTime, 'Asia/Kolkata').format();
            let BookingEndTime = moment.tz(action.order.bookingEndTime, 'Asia/Kolkata').format();
            action.order.bookingDateTime = new Date(BookingDateTime);
            action.order.bookingStartTime = new Date(BookingStartTime);
            action.order.bookingEndTime = new Date(BookingEndTime);

            let recentOrders = [...state.recentOrders, action.order];

            return Object.assign({}, state, {
                recentOrders: recentOrders
            });

        case SOD_MOVE_TO_RUNNING_LATE:

            let runningLateOrders = [...state.runningLate, action.order];
            console.log('action', action.order);

            //remove Recent Order
            removeOrder = state.recentOrders.find(function (recentOrder) {
                return recentOrder.id === action.order.id;
            });
            index = state.recentOrders.indexOf(removeOrder);
            state.recentOrders.splice(index, 1);

            return Object.assign({}, state, {
                runningLate: runningLateOrders,
                recentOrders: state.recentOrders
            });

        default:
            return state;
    }
};
