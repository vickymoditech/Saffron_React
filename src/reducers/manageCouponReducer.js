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

        case COUPON_ADD_SUCCESS:
            let coupon = {
                id: action.data.data.id,
                name: action.data.data.name,
                info: action.data.data.info,
                percentage:action.data.data.percentage,
                minPrice: action.data.data.minPrice,
                maxPrice: action.data.data.maxPrice,
                maxDiscount: action.data.data.maxDiscount,
                startDate: action.data.data.startDate,
                endDate: action.data.data.endDate,
                userId: action.data.data.userId,
            };
            return Object.assign({}, state, {
                couponList: [...state.couponList, coupon],
                Loading: false,
                error_msg: null,
                success_msg: action.data.result
            });


        default:
            return state;
    }
};
