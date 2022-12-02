import { Response } from 'express';
import { AppResponseCodeEnum } from "../enums/app-response-code.enum";
import logger from './logger';

// wrongApiKey matches express ts type
export const authErrorResponse = (res: Response, wrongApiKey: string | string[]) => {
    const wrongApiKeyWrapper = `(key: ${wrongApiKey})`;
    logger.error(`authError: ${wrongApiKeyWrapper}`);
    return res.status(AppResponseCodeEnum.authError).send({
        code: AppResponseCodeEnum.authError,
        isError: true,
        data: {
            name: 'AUTH_ERROR',
            message: 'Authorization error',
            stack: `Wrong API key provided${process.env.NODE_ENV === 'dev' ? wrongApiKeyWrapper : ' (key is hidden on prod)' }`
        }
    });
} 

export const appFailResponse = (res: Response, error: Error) => {
    logger.error(`${error.name} ${error.message} ${error.stack}`);
    return res.status(AppResponseCodeEnum.generalError).send({
        code: AppResponseCodeEnum.generalError,
        isError: true,
        data: {
            name: error.name,
            message: error.message,
            stack: process.env.NODE_ENV === 'dev' ? error.stack : '(hidden on prod)'
        }
    });
}

export const appSuccessResponse = (res: Response, code: AppResponseCodeEnum, body: any) => {
    return res.status(code).send({
        code,
        isError: false,
        data: body,
    });
}