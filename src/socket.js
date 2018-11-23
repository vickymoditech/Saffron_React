import io from 'socket.io-client';
import ENVIRONMENT_VARIABLES from "./environment.config";

const socket = io(ENVIRONMENT_VARIABLES.SOCKET_URL);

function subscribeToTimer(cb) {
    socket.on('new test', data => cb(null, data));
}

export {subscribeToTimer};