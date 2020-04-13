import {browserHistory} from 'react-router';
import {
    WEBSITE_INPROGRESS,
    WEBSITE_NOT_SUCCESS,
    WEBSITE_CONNECTION_ERROR,
    ALL_GALLERY_SUCCESS,
    ALL_PRODUCTS_SUCCESS,
    ALL_TIMESLOTS_SUCCESS,
    ADDPRODUCTTOCART,
    REMOVEPRODUCTTOCART,
    WEBSITE_HOME,
    GET_SAFFRON_POINTS,
    LOGOUT_USER, BASKETVISIBLE, ORDER_PLACE, COMPLETED_ORDER_LIST, ALL_VIDEOS_SUCCESS, ALL_COUPON_SUCCESS,
    APPLY_COUPON_SUCCESS, APPLY_COUPON_REMOVE, WEBSITE_DEFAULT_CLEAR
} from '../constants/actionTypes';
import {disconnect} from '../socket';


import initialState from './initialState';

export default function websiteReducer(state = initialState.websiteReducer, action) {
    switch (action.type) {

        case WEBSITE_DEFAULT_CLEAR:
            return Object.assign({}, state, {error_msg: null, success_msg: null});

        case WEBSITE_INPROGRESS:
            return Object.assign({}, state, {
                Loading: true,
                success_msg: null,
                error_msg: null
            });

        case WEBSITE_CONNECTION_ERROR:
            return Object.assign({}, state, {Loading: false, error_msg: action.data.error_msg, TimeSlotVisible: false});

        case WEBSITE_NOT_SUCCESS:
            return Object.assign({}, state, {
                error_msg: action.data.error_msg,
                Loading: false,
                TimeSlotVisible: false
            });

        case ALL_GALLERY_SUCCESS:
            return Object.assign({}, state, {
                allGalleryList: action.data,
                Loading: false,
                error_msg: null
            });

        case ALL_VIDEOS_SUCCESS:
            return Object.assign({}, state, {
                allVideoList: action.data,
                Loading: false,
                error_msg: null
            });

        case ALL_COUPON_SUCCESS:
            return Object.assign({}, state, {
                allCouponsList: action.data,
                Loading: false,
                error_msg: null
            });

        case APPLY_COUPON_REMOVE:
            return Object.assign({}, state, {
                selectedCoupon: null,
                TimeSlotVisible: false,
                Loading: false,
                error_msg: null
            });

        case APPLY_COUPON_SUCCESS:
            return Object.assign({}, state, {
                selectedCoupon: action.data.couponDetail,
                TimeSlotVisible: false,
                success_msg: action.data.result,
                Loading: false,
                error_msg: null
            });

        case ALL_PRODUCTS_SUCCESS:
            return Object.assign({}, state, {
                AllProductsList: action.data,
                Loading: false,
                error_msg: null
            });

        case WEBSITE_HOME:
            return Object.assign({}, state, {
                sliderList: action.SliderList,
                serviceList: action.ServicesList,
                galleryList: action.GalleryList,
                teamList: action.TeamList,
                Loading: false,
                error_msg: null
            });

        case ADDPRODUCTTOCART:
            const BasketGeneratorProducts = [...state.BasketGeneratorProducts, action.data];
            localStorage.setItem("BasketGeneratorProducts", JSON.stringify({BasketList: BasketGeneratorProducts}));
            return Object.assign({}, state, {
                BasketGeneratorProducts: BasketGeneratorProducts,
                Loading: false,
                error_msg: null
            });

        case ORDER_PLACE:
            localStorage.removeItem("BasketGeneratorProducts");
            return Object.assign({}, state, {
                RecentOrder: action.data,
                BasketGeneratorProducts: [],
                BasketVisible: false,
                TimeSlotVisible: false,
                success_msg: "your order successfully has been placed",
                selectedCoupon: null,
                Loading: false,
                error_msg: null
            });

        case REMOVEPRODUCTTOCART:
            const findProduct = state.BasketGeneratorProducts.find((data) => data.product.id === action.data.product_id && data.teamMember.id === action.data.teamMember_id);
            const findIndex = state.BasketGeneratorProducts.indexOf(findProduct);
            localStorage.removeItem("BasketGeneratorProducts");
            state.BasketGeneratorProducts.splice(findIndex, 1);
            localStorage.setItem("BasketGeneratorProducts", JSON.stringify({BasketList: [...state.BasketGeneratorProducts]}));
            return Object.assign({}, state, {
                BasketGeneratorProducts: [...state.BasketGeneratorProducts],
                Loading: false,
                error_msg: null
            });

        case ALL_TIMESLOTS_SUCCESS:
            return Object.assign({}, state, {
                TimeSlots: action.data,
                Loading: false,
                error_msg: null,
                TimeSlotVisible: true
            });

        case BASKETVISIBLE:
            return Object.assign({}, state, {
                BasketVisible: action.data,
                success_msg: null,
                error_msg: null
            });

        case COMPLETED_ORDER_LIST:
            return Object.assign({}, state, {
                RecentCompleteOrder: [...action.data.TodayOrders],
                SaffronPoint: action.data.UserPoints.saffronPoint,
                saffronPointUse: action.data.UserPoints.saffronPointUse,
                Loading: false,
                error_msg: null
            });

        case GET_SAFFRON_POINTS:
            return Object.assign({}, state, {
                SaffronPoint: action.data.UserPoints.saffronPoint,
                Loading: false,
                error_msg: null
            });

        case LOGOUT_USER:
            disconnect();
            browserHistory.push('/');
            return Object.assign({}, state, {
                Loading: false,
                BasketGeneratorProducts: []
            });

        default:
            return state;
    }
};
