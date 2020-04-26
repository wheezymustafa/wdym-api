import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';

import express, { Request, Response, NextFunction } from 'express';
import { BAD_REQUEST } from 'http-status-codes';
import 'express-async-errors';

//import BaseRouter from './routes';
import logger from '@shared/Logger';

import {init as dbConnect} from './services/DbClient'
import BaseRouter from './routes/GameAssetsRoutes';

import * as cacheClient from './services/CacheClient'
const app = express();
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



console.log(BaseRouter.stack)

/************************************************************************************
 *                              Serve front-end content
 ***********************************************************************************/

// const viewsDir = path.join(__dirname, 'views');
// app.set('views', viewsDir);
// const staticDir = path.join(__dirname, 'public');
// app.use(express.static(staticDir));
// app.get('*', (req: Request, res: Response) => {
//     res.sendFile('index.html', {root: viewsDir});
// });

// Export express instance
export default app;
