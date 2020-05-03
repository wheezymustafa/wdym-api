import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import express, { Request, Response, NextFunction } from 'express';
import { BAD_REQUEST } from 'http-status-codes';
import 'express-async-errors';
import logger from '@shared/Logger';
import {init as dbConnect} from './services/DbClient'
import BaseRouter from './routes';
import * as cacheClient from './services/CacheClient'
import * as http from 'http'
import socketIo = require('socket.io')
import cors from 'cors'
const app = express();

let server = http.createServer(app)
server.listen(3111, () => {
    console.log("ok im listening on 3111")
})

let io = socketIo(server)
io.on('connection', (socket) => {
    console.log("someone connected! lol")
})


const dbUrl = 'mongodb://wdymadmin:C0starica@localhost:27017/?authSource=admin';
const gameAssetsDbName = 'GameAssets';
dbConnect(dbUrl, gameAssetsDbName)

const cacheUrl = "redis://localhost:6379"
cacheClient.initCache(cacheUrl)
// const gameAssetsDb = new DbClient(url, gameAssetsDbName)
// const dataService = new DataService(gameAssetsDb)
// const gameAssetsService = new GameAssetsService(dataService)
// const gameAssetRoutes = GameAssetRoutes(gameAssetsService)

/************************************************************************************
 *                              Set basic express settings
 ***********************************************************************************/
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
// Show routes called in console during development
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Security
if (process.env.NODE_ENV === 'production') {
    app.use(helmet());
}

// Add APIs

app.use('/api', BaseRouter);
// app.use('/game', GameAssetRoutes(gameAssetsService))

// Print API errors
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    logger.error(err.message, err);
    return res.status(BAD_REQUEST).json({
        error: err.message,
    });
});

app.get('/', (req, res, next) => {
    res.sendFile(__dirname + '/views' + '/index.html')
})


// Export express instance
export default app;
