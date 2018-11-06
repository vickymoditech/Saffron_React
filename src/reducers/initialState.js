import decode from 'jwt-decode';

let accessToken = localStorage.getItem('accessToken');
let userProfile;

if (accessToken) {
    try {
        userProfile = decode(accessToken);
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
        loading: false,
        userList: []
    }
}
