"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const http = tslib_1.__importStar(require("http"));
const socketIo = require("socket.io");
const Logger_1 = tslib_1.__importDefault(require("@shared/Logger"));
const lodash_1 = tslib_1.__importDefault(require("lodash"));
function default_1(listener) {
    let server;
    let io;
    server = http.createServer(listener);
    server.listen(3111, () => {
        console.log("ok im listening on 3111");
    });
    io = socketIo(server);
    io.on('connection', (socket) => {
        socket.on('disconnect', () => {
            console.log('someone disconnected');
        });
        socket.on('initPlayer', (data) => {
            console.log(JSON.stringify(data));
            if (!lodash_1.default.isNull(data.gameId)) {
                socket.join(data.gameId, (err) => {
                    if (err) {
                        Logger_1.default.error(`Err joining room: ${data.gameId}: ${err}`);
                    }
                    socket.to(data.gameId).emit(`${data.username} has joined!`);
                    console.log(socket);
                });
            }
        });
    });
}
exports.default = default_1;
//# sourceMappingURL=SocketIoListener.js.map