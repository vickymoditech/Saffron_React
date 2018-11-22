import io from 'socket.io-client';
const socket = io('http://localhost:9000');

// socket.on("new test", (data) => {
//     debugger;
//     console.log("new test",data);
// });

function subscribeToTimer(cb) {
    socket.on('new test', data => cb(null, data));
}
export { subscribeToTimer };