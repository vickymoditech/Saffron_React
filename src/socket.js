import io from 'socket.io-client';
import ENVIRONMENT_VARIABLES from "./environment.config";

const socket = io(ENVIRONMENT_VARIABLES.SOCKET_URL);

function newSODMessage(cb) {
    socket.on('SOD', data => cb(null, data));
}

export {newSODMessage};