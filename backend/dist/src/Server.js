"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const cookie_parser_1 = tslib_1.__importDefault(require("cookie-parser"));
const morgan_1 = tslib_1.__importDefault(require("morgan"));
const helmet_1 = tslib_1.__importDefault(require("helmet"));
const express_1 = tslib_1.__importDefault(require("express"));
const http_status_codes_1 = require("http-status-codes");
require("express-async-errors");
const Logger_1 = tslib_1.__importDefault(require("@shared/Logger"));
const DbClient_1 = require("./services/DbClient");
const routes_1 = tslib_1.__importDefault(require("./routes"));
const cacheClient = tslib_1.__importStar(require("./services/CacheClient"));
const cors_1 = tslib_1.__importDefault(require("cors"));
const app = express_1.default();
const SocketIoListener_1 = tslib_1.__importDefault(require("./services/SocketIoListener"));
SocketIoListener_1.default(app);
const dbUrl = 'mongodb://wdymadmin:C0starica@localhost:27017/?authSource=admin';
const gameAssetsDbName = 'GameAssets';
DbClient_1.init(dbUrl, gameAssetsDbName);
const cacheUrl = "redis://localhost:6379";
cacheClient.initCache(cacheUrl);
app.use(cors_1.default());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(cookie_parser_1.default());
if (process.env.NODE_ENV === 'development') {
    app.use(morgan_1.default('dev'));
}
if (process.env.NODE_ENV === 'production') {
    app.use(helmet_1.default());
}
app.use('/api', routes_1.default);
app.use((err, req, res, next) => {
    Logger_1.default.error(err.message, err);
    return res.status(http_status_codes_1.BAD_REQUEST).json({
        error: err.message,
    });
});
app.get('/', (req, res, next) => {
    res.sendFile(__dirname + '/views' + '/index.html');
});
exports.default = app;
//# sourceMappingURL=Server.js.map