import { MongoClient, Db } from "mongodb"
import logger from '@shared/Logger';
import _ from "lodash"
var _db: Db

export function init(connectionString: string, dbName: string) {
    MongoClient.connect(connectionString, { useUnifiedTopology: true })
        .then(client => {
            logger.info(`connected to DB ${dbName}`)
            _db = client.db(dbName)
        })
}

export function getClient(): Db {
    if (!_db) {
        throw new ReferenceError("DB not yet initialized")
    }
    return _db
}
