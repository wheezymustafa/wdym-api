"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const redis_1 = tslib_1.__importDefault(require("redis"));
const Logger_1 = tslib_1.__importDefault(require("@shared/Logger"));
var client;
function initCache(url) {
    client = redis_1.default.createClient({ url: url });
    client.on("ready", () => {
        Logger_1.default.info("connected to cache");
    });
}
exports.initCache = initCache;
function getClient() {
    if (!client) {
        throw new ReferenceError("Cache not yet initialized");
    }
    return client;
}
exports.getClient = getClient;
//# sourceMappingURL=CacheClient.js.map