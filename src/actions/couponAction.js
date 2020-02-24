import axios from 'axios';
import ENVIRONMENT_VARIABLES from '../environment.config';
import {
    COUPON_INPROGRESS,
    COUPON_NOT_SUCCESS,
    COUPON_SUCCESS,
    COUPON_DELETE_SUCCESS,
    COUPON_ADD_SUCCESS,
    COUPON_CONNECTION_ERROR,
    COUPON_DEFAULT_CLEAR,
} from '../constants/actionTypes';

export const CouponList = () => {
    try {
        return (dispatch) => {
            dispatch({type: COUPON_INPROGRESS});
            const token = "Bearer " + localStorage.getItem('accessToken');

            let api = {
                method: 'GET',
                headers: {'Authorization': token},
                url: ENVIRONMENT_VARIABLES.API_URL + "/coupons"
            };

            axios(api).then((response) => {
                if (response.status === 200) {
                    dispatch({type: COUPON_SUCCESS, data: response.data});
                }
            }).catch((error) => {
                if (error && error.response && (error.response.status === 400 || error.response.status === 403 || error.response.status === 401)) {
                    dispatch({type: COUPON_NOT_SUCCESS, data: {error_msg: error.response.data.user_msg}});
                } else {
                    dispatch({type: COUPON_CONNECTION_ERROR, data: {error_msg: error.message.toString()}});
                }
            });
        }
    } catch (error) {
        alert(error.message.toString());
    }
};

export const CouponDelete = (CouponId) => {
    try {
        return (dispatch) => {
            dispatch({type: COUPON_INPROGRESS});
            const token = "Bearer " + localStorage.getItem('accessToken');

            let api = {
                method: 'DELETE',
                headers: {'Authorization': token},
                url: ENVIRONMENT_VARIABLES.API_URL + "/coupons/" + CouponId
            };

            axios(api).then((response) => {
                if (response.status === 200) {
                    dispatch({type: COUPON_DELETE_SUCCESS, data: response.data});
                }
            }).catch((error) => {
                if (error && error.response && (error.response.status === 400 || error.response.status === 403 || error.response.status === 401)) {
                    dispatch({type: COUPON_NOT_SUCCESS, data: {error_msg: error.response.data.user_msg}});
                } else {
                    dispatch({type: COUPON_CONNECTION_ERROR, data: {error_msg: error.message.toString()}});
                }
            });
        }
    } catch (error) {
        alert(error.message.toString());
    }
};

//
// export const AddCOUPON = (COUPON) => {
//     try {
//         return (dispatch) => {
//             dispatch({type: COUPON_INPROGRESS});
//             const token = "Bearer " + localStorage.getItem('accessToken');
//
//             let request = {
//                 service_id: COUPON.service_id,
//                 COUPON_url: COUPON.COUPON_url,
//                 title: COUPON.title,
//                 description: COUPON.description,
//                 sex: COUPON.sex
//             };
//
//             let api = {
//                 method: 'POST',
//                 headers: {'Authorization': token},
//                 url: ENVIRONMENT_VARIABLES.API_URL + "/COUPONs",
//                 data: request,
//             };
//
//             axios(api).then((response) => {
//                 if (response.status === 200) {
//                     dispatch({
//                         type: COUPON_ADD_SUCCESS,
//                         data: response.data,
//                         selectedServiceId: COUPON.selectedServiceId
//                     });
//                 }
//             }).catch((error) => {
//                 if (error && error.response && (error.response.status === 400 || error.response.status === 403 || error.response.status === 401)) {
//                     dispatch({type: COUPON_NOT_SUCCESS, data: {error_msg: error.response.data.user_msg}});
//                 } else {
//                     dispatch({type: COUPON_CONNECTION_ERROR, data: {error_msg: error.message.toString()}});
//                 }
//             });
//         }
//     } catch (error) {
//         alert(error.message.toString());
//     }
// };

export const DefaultMessageClear = () => {
    try {
        return (dispatch) => {
            dispatch({type: COUPON_DEFAULT_CLEAR});
        }
    } catch (error) {
        alert(error.message.toString());
    }
};
