import { config } from 'dotenv';
import express from 'express';
import cors from 'cors';
import { itemRouter, tipsRouter } from './routes/index';
import logger from './utils/logger';
import dbInit from './utils/dbInit';

config();
const isProdEnv = process.env.NODE_ENV! !== 'dev';
const app = express();

app.use(cors());
app.use(express.json());

app.use('/items', itemRouter);
app.use('/tips', tipsRouter);

dbInit().then(() => logger.info('DB connected!'));

// Some meta info in healthcheck...
app.get('/', (_req, res, _next) => res.status(200).send({ 
    app: 'lizrok-nahon-crud',
    health: 'ok'
 }));

const APP_PORT = +process.env.APP_PORT!;
const APP_HOST = process.env.APP_HOST!;

app.listen(APP_PORT, APP_HOST, () => {
    logger.info(`app listening on ${APP_HOST}:${APP_PORT}`);
    if (!isProdEnv) {
        logger.warn('dev mode!');
    }
});