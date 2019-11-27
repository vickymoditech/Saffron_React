import decode from 'jwt-decode';

let accessToken = localStorage.getItem('accessToken');
let userProfile;

if (accessToken) {
    try {
        userProfile = decode(accessToken).user;
    } catch (error) {
        userProfile = []
    }
}

export default {
    authReducer: {
        loading: false,
        userProfile: userProfile || [],
        userAvatar: localStorage.getItem('userAvatar'),
    },
    manageUserReducer: {
        Loading: false,
        userList: [],
        error_msg: null,
        success_msg: null
    },
    manageServiceReducer: {
        Loading: false,
        serviceList: [],
        error_msg: null,
        success_msg: null,
    },
    manageSliderReducer: {
        Loading: false,
        sliderList: [],
        error_msg: null,
        success_msg: null,
    },
    manageTeamProductReducer: {
        Loading: false,
        teamProductList: [],
        allProductList: [],
        error_msg: null,
        success_msg: null,
    },
    manageGalleryReducer: {
        Loading: false,
        galleryList: [],
        error_msg: null,
        success_msg: null,
    },
    manageVideoReducer: {
        Loading: false,
        videoList: [],
        error_msg: null,
        success_msg: null,
    },
    manageTeamReducer: {
        Loading: false,
        teamList: [],
        error_msg: null,
        success_msg: null,
    },
    saffronOrdersDisplayReducer: {
        Loading: false,
        error_msg: null,
        runningOrder: [],
        runningLate: [],
        recentOrders: [],
        recentComplete: []
    },
    websiteReducer: {
        Loading: false,
        error_msg: null,
        teamList: [],
        galleryList: [],
        serviceList: [],
        allGalleryList: [],
        sliderList: []
    },
    manageTimeSlotReducer: {
        Loading: false,
        TimeSlotList: [],
        error_msg: null,
        success_msg: null,
    },

}
