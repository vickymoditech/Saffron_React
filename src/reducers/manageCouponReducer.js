import {
    COUPON_INPROGRESS,
    COUPON_NOT_SUCCESS,
    COUPON_SUCCESS,
    COUPON_DELETE_SUCCESS,
    COUPON_ADD_SUCCESS,
    COUPON_CONNECTION_ERROR,
    COUPON_DEFAULT_CLEAR,
} from '../constants/actionTypes';


import initialState from './initialState';

export default function manageCouponReducer(state = initialState.manageCouponReducer, action) {
    switch (action.type) {

        case COUPON_DEFAULT_CLEAR:
            return Object.assign({}, state, {error_msg: null, success_msg: null});

        case COUPON_INPROGRESS:
            return Object.assign({}, state, {Loading: true, error_msg: null, success_msg: null});

        case COUPON_CONNECTION_ERROR:
            return Object.assign({}, state, {
                Loading: false,
                error_msg: action.data.error_msg,
                success_msg: null
            });

        case COUPON_NOT_SUCCESS:
            return Object.assign({}, state, {
                error_msg: action.data.error_msg,
                Loading: false,
                success_msg: null,
            });

        case COUPON_SUCCESS:
            return Object.assign({}, state, {
                couponList: action.data,
                Loading: false,
                error_msg: null,
                success_msg: null,
            });

        case COUPON_DELETE_SUCCESS:
            let removeCoupon = state.couponList.find(function (coupon) {
                return coupon.id === action.data.id;
            });
            let index = state.couponList.indexOf(removeCoupon);
            state.couponList.splice(index, 1);

            return Object.assign({}, state, {
                couponList: state.couponList,
                Loading: false,
                error_msg: null,
                success_msg: action.data.result
            });

        // case COUPON_ADD_SUCCESS:
        //     let videoList = state.videoList;
        //     if (action.selectedServiceId === action.data.data.service_id) {
        //         let video = {
        //             id: action.data.data.id,
        //             video_url: action.data.data.video_url,
        //             title: action.data.data.title,
        //             description: action.data.data.description,
        //             service_id: action.data.data.service_id,
        //             sex: action.data.data.sex
        //         };
        //         videoList = [video, ...state.videoList];
        //     }
        //
        //     return Object.assign({}, state, {
        //         videoList: videoList,
        //         Loading: false,
        //         error_msg: null,
        //         success_msg: action.data.result
        //     });


        default:
            return state;
    }
};
