import {
    TEAM_INPROGRESS,
    TEAM_NOT_SUCCESS,
    TEAM_SUCCESS,
    TEAM_DELETE_SUCCESS,
    TEAM_CONNECTION_ERROR,
} from '../constants/actionTypes';


import initialState from './initialState';

export default function manageTeamReducer(state = initialState.manageTeamReducer, action) {
    switch (action.type) {

        case TEAM_INPROGRESS:
            return Object.assign({}, state, {Loading: true});

        case TEAM_CONNECTION_ERROR:
            return Object.assign({}, state, {teamList: [], Loading: false, error_msg: action.data.error_msg});

        case TEAM_NOT_SUCCESS:
            return Object.assign({}, state, {
                teamList: [],
                error_msg: action.data.error_msg,
                Loading: false
            });

        case TEAM_SUCCESS:
            return Object.assign({}, state, {
                teamList: action.data,
                Loading: false,
                error_msg: null
            });

        case TEAM_DELETE_SUCCESS:

            let removeTeam = state.teamList.find(function (team) {
                return team.id === action.data.id;
            });
            let index = state.teamList.indexOf(removeTeam);
            state.teamList.splice(index, 1);

            return Object.assign({}, state, {
                teamList: state.teamList,
                Loading: false,
                error_msg: null,
                success_msg: action.data.result
            });

        default:
            return state;
    }
};


