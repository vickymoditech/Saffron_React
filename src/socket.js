import io from 'socket.io-client';
import ENVIRONMENT_VARIABLES from "./environment.config";
import {GetLocalUderData} from './index';

const socket = io(ENVIRONMENT_VARIABLES.SOCKET_URL);
const userProfile = GetLocalUderData();
let socketKey = "SOD";

//Todo channel name will be changed here. for employee, get name from localStorage
if (userProfile && userProfile.user.role === "employee") {
    socketKey = userProfile.id;
    debugger;
}

function newSODMessage(cb) {
    socket.on(socketKey, data => cb(null, data));
}

export {newSODMessage};