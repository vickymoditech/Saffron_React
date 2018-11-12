//import axios from 'axios';
//import ENVIRONMENT_VARIABLES from '../environment.config';
import {
    SOD_INPROGRESS,
    SOD_NOT_SUCCESS,
    SOD_SUCCESS,
    SOD_CONNECTION_ERROR
} from '../constants/actionTypes';

export const OrdersList = () => {
    try {
        return (dispatch) => {
            dispatch({type: SOD_INPROGRESS});
            // const token = "Bearer " + localStorage.getItem('accessToken');
            //
            // const api = {
            //     method: 'GET',
            //     headers: {'Authorization': token},
            //     url: ENVIRONMENT_VARIABLES.API_URL + "/oauths"
            // };
            // axios(api).then((response) => {
            //     if (response.status === 200) {
            //         dispatch({type: USER_SUCCESS, data: response.data});
            //     }
            // }).catch((error) => {
            //     debugger;
            //     if (error && error.response && (error.response.status === 400 || error.response.status === 403 || error.response.status === 401)) {
            //         dispatch({type: USER_CHANGE_NOT_SUCCESS, data: {error_msg: error.response.data.user_msg}});
            //     } else {
            //         dispatch({type: USER_CONNECTION_ERROR, data: {error_msg: error.message.toString()}});
            //     }
            // });

            setTimeout(function () {
                dispatch({
                    type: SOD_SUCCESS, runningOrder: [{
                        key: 0,
                        status: "process",
                        column: "running",
                        orderTime: "12-11-2018 19:42:01",
                        orderStartTime: "12-11-2018 16:27:01",
                        orderNo: "12345",
                        currentElement: 0
                    }, {
                        key: 1,
                        status: "process",
                        column: "running",
                        orderTime: "12-11-2018 19:42:01",
                        orderStartTime: "12-11-2018 16:27:01",
                        orderNo: "12345",
                        currentElement: 1
                    }, {
                        key: 2,
                        status: "process",
                        column: "running",
                        orderTime: "12-11-2018 19:42:01",
                        orderStartTime: "12-11-2018 16:27:01",
                        orderNo: "12345",
                        currentElement: 2
                    }, {
                        key: 3,
                        status: "process",
                        column: "running",
                        orderTime: "12-11-2018 19:42:01",
                        orderStartTime: "12-11-2018 16:27:01",
                        orderNo: "12345",
                        currentElement: 3
                    }, {
                        key: 4,
                        status: "process",
                        column: "running",
                        orderTime: "12-11-2018 19:42:01",
                        orderStartTime: "12-11-2018 16:27:01",
                        orderNo: "12345",
                        currentElement: 4
                    }, {
                        key: 5,
                        status: "process",
                        column: "running",
                        orderTime: "12-11-2018 19:42:01",
                        orderStartTime: "12-11-2018 16:27:01",
                        orderNo: "12345",
                        currentElement: 5
                    }, {
                        key: 6,
                        status: "process",
                        column: "running",
                        orderTime: "12-11-2018 19:42:01",
                        orderStartTime: "12-11-2018 16:27:01",
                        orderNo: "12345",
                        currentElement: 6
                    }, {
                        key: 7,
                        status: "process",
                        column: "running",
                        orderTime: "12-11-2018 19:42:01",
                        orderStartTime: "12-11-2018 16:27:01",
                        orderNo: "12345",
                        currentElement: 7
                    }, {
                        key: 8,
                        status: "process",
                        column: "running",
                        orderTime: "12-11-2018 19:42:01",
                        orderStartTime: "12-11-2018 16:27:01",
                        orderNo: "12345",
                        currentElement: 8
                    }, {
                        key: 9,
                        status: "process",
                        column: "running",
                        orderTime: "12-11-2018 19:42:01",
                        orderStartTime: "12-11-2018 16:27:01",
                        orderNo: "12345",
                        currentElement: 9
                    }, {
                        key: 10,
                        status: "process",
                        column: "running",
                        orderTime: "12-11-2018 19:42:01",
                        orderStartTime: "12-11-2018 16:27:01",
                        orderNo: "12345",
                        currentElement: 10
                    }], runningLate: [{
                        key: 0,
                        status: "late",
                        column: "running late",
                        orderTime: "12-11-2018 19:42:01",
                        orderStartTime: "12-11-2018 16:27:01",
                        orderNo: "123",
                        currentElement: 0
                    }], recentOrders: [{
                        key: 0,
                        status: "waiting",
                        column: "recent orders",
                        orderTime: "12-11-2018 19:42:01",
                        orderStartTime: "12-11-2018 16:27:01",
                        orderNo: "123456",
                        currentElement: 0
                    }]
                });

            }, 3000);
        }
    } catch (error) {
        alert(error.message.toString());
    }
};