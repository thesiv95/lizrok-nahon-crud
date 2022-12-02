import { Request, Response, NextFunction } from 'express';
import { appFailResponse, authErrorResponse } from './response';
import logger from './logger';

const auth = (req: Request, res: Response, next: NextFunction) => {
    try {
        const correctXAPIKey = process.env.AUTH_KEY!;
        const apiKeyFromRequest = req.headers['x-api-key']!;

        if (correctXAPIKey !== apiKeyFromRequest) {
            logger.warn('Authorization attempt failed');
            return next(authErrorResponse(res, apiKeyFromRequest));
        }

        return next();

    } catch (error) {
        const errorCasted = error as Error;
        return next(appFailResponse(res, errorCasted));
    }
};


export default auth;