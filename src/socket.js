import io from 'socket.io-client';
import ENVIRONMENT_VARIABLES from "./environment.config";

const socket = io(ENVIRONMENT_VARIABLES.SOCKET_URL);
let userProfile = localStorage.getItem("userProfile");
let socketKey = "SOD";

console.log(userProfile);

if(userProfile.role === "employee"){
    socketKey = userProfile.id;
}

function newSODMessage(cb) {
    socket.on(socketKey, data => cb(null, data));
}

export {newSODMessage};