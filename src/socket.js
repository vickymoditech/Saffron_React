import io from 'socket.io-client';
import ENVIRONMENT_VARIABLES from "./environment.config";

const socket = io(ENVIRONMENT_VARIABLES.SOCKET_URL);

function testingOrderList(cb) {
    socket.on('testingOrderList', data => cb(null, data));
}

export {testingOrderList};