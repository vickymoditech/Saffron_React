import axios from 'axios';
import ENVIRONMENT_VARIABLES from '../environment.config';
import moment from 'moment';

import {
    SOD_INPROGRESS,
    SOD_NOT_SUCCESS,
    SOD_SUCCESS,
    SOD_CONNECTION_ERROR,
    SOD_RECENT_MOVE_TO_PROGRESS,
    SOD_RUNNING_LATE_MOVE_TO_PROGRESS,
    SOD_RECENT_NEW_ORDER,
    SOD_MOVE_TO_RUNNING_LATE,
} from '../constants/actionTypes';

export const OrdersList = () => {
    try {
        return (dispatch) => {
            dispatch({type: SOD_INPROGRESS});
            const token = "Bearer " + localStorage.getItem('accessToken');

            const api = {
                method: 'GET',
                headers: {'Authorization': token},
                url: ENVIRONMENT_VARIABLES.API_URL + "/Bookings"
            };
            axios(api).then((response) => {
                if (response.status === 200) {
                    dispatch({type: SOD_SUCCESS, data: response.data});
                }
            }).catch((error) => {
                debugger;
                if (error && error.response && (error.response.status === 400 || error.response.status === 403 || error.response.status === 401)) {
                    dispatch({type: SOD_NOT_SUCCESS, data: {error_msg: error.response.data.user_msg}});
                } else {
                    dispatch({type: SOD_CONNECTION_ERROR, data: {error_msg: error.message.toString()}});
                }
            });

            // setTimeout(function () {
            //     dispatch({
            //         type: SOD_SUCCESS, runningOrder: [{
            //             status: "process",
            //             column: "running",
            //             orderTime: Date.now(),
            //             orderStartTime: Date.now(),
            //             orderNo: "1"
            //         }, {
            //             status: "process",
            //             column: "running",
            //             orderTime: Date.now(),
            //             orderStartTime: Date.now(),
            //             orderNo: "2"
            //         }, {
            //             status: "process",
            //             column: "running",
            //             orderTime: Date.now(),
            //             orderStartTime: Date.now(),
            //             orderNo: "3"
            //         }, {
            //             status: "process",
            //             column: "running",
            //             orderTime: Date.now(),
            //             orderStartTime: Date.now(),
            //             orderNo: "4"
            //         }], runningLate: [{
            //             status: "late",
            //             column: "running late",
            //             orderTime: new Date(new Date().getTime() - 30 * 60000),
            //             orderStartTime: new Date(new Date().getTime() - 30 * 60000),
            //             orderNo: "1"
            //         }, {
            //             status: "late",
            //             column: "running late",
            //             orderTime: new Date(new Date().getTime() - 20 * 60000),
            //             orderStartTime: new Date(new Date().getTime() - 20 * 60000),
            //             orderNo: "2"
            //         }, {
            //             status: "late",
            //             column: "running late",
            //             orderTime: new Date(new Date().getTime() - 10 * 60000),
            //             orderStartTime: new Date(new Date().getTime() - 10 * 60000),
            //             orderNo: "3"
            //         }], recentOrders: [{
            //             status: "waiting",
            //             column: "recent orders",
            //             orderTime: new Date(new Date().getTime() + 10 * 60000),
            //             orderStartTime: new Date(new Date().getTime() + 10 * 60000),
            //             orderNo: "1"
            //         }, {
            //             status: "waiting",
            //             column: "recent orders",
            //             orderTime: new Date(new Date().getTime() + 20 * 60000),
            //             orderStartTime: new Date(new Date().getTime() + 20 * 60000),
            //             orderNo: "2"
            //         }]
            //     });
            //
            // }, 3000);
        }
    } catch (error) {
        alert(error.message.toString());
    }
};

export const MoveToProgress = (order) => {
    try {
        return (dispatch) => {
            let column = order.column;
            //update Order from the api
            order.status = "process";
            order.column = "running";
            // todo change columns name
            order.orderStartTime = Date.now();

            if (column === "running late") {
                //update Order from the api
                dispatch({
                    type: SOD_RUNNING_LATE_MOVE_TO_PROGRESS,
                    order
                });
            } else {
                //update Order from the api
                dispatch({
                    type: SOD_RECENT_MOVE_TO_PROGRESS,
                    order
                });
            }
        }
    } catch (error) {
        alert(error.message.toString());
    }
};

export const MoveToRunningLate = (order) => {
    try {
        return (dispatch) => {
            dispatch({
                type: SOD_MOVE_TO_RUNNING_LATE,
                order
            });
        }
    } catch (error) {
        console.log(error);
    }
};


export const NewOrder = (order) => {
    try {
        return (dispatch) => {
            dispatch({
                type: SOD_RECENT_NEW_ORDER,
                order
            });
        }
    } catch (error) {
        alert(error.message.toString());
    }
};