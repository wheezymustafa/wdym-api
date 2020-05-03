import redis, { RedisClient } from 'redis'
import logger from '@shared/Logger';
var client: RedisClient

export function initCache(url: string) {
    client = redis.createClient({ url: url })
    client.on("ready", () => {
        logger.info("connected to cache")
    })
}

export function getClient() {
    if (!client) {
        throw new ReferenceError("Cache not yet initialized")
    }
    return client
}