"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mongodb_1 = require("mongodb");
const Logger_1 = tslib_1.__importDefault(require("@shared/Logger"));
var _db;
function init(connectionString, dbName) {
    mongodb_1.MongoClient.connect(connectionString, { useUnifiedTopology: true })
        .then(client => {
        Logger_1.default.info(`connected to DB ${dbName}`);
        _db = client.db(dbName);
    });
}
exports.init = init;
function getClient() {
    if (!_db) {
        throw new ReferenceError("DB not yet initialized");
    }
    return _db;
}
exports.getClient = getClient;
//# sourceMappingURL=DbClient.js.map