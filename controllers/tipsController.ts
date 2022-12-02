import { Request, Response, NextFunction } from 'express';
import { AppResponseCodeEnum } from '../enums/app-response-code.enum';
import { appSuccessResponse, appFailResponse } from '../utils/response';
import getRandomIndexFromRange from '../utils/getRandomIndexFromRange';
import Tip from '../models/tipsModel';

export const findTip = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const tipsLength = await Tip.countDocuments({});
        const randomIndex = getRandomIndexFromRange(1, tipsLength);

        const tipItem = await Tip.findOne({ index: randomIndex });

        if (!tipItem) throw new Error('Tip index error! Check');

        const tip = {
            title: tipItem.title,
            text: tipItem.text,
        }; 

        return next(appSuccessResponse(res, AppResponseCodeEnum.ok, tip));
    } catch (error) {
        const errorCasted = error as Error;
        return next(appFailResponse(res, errorCasted));
    }
};

// ADMIN PANEL
export const getAllTips = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { page = 1, perPage = 5 } = req.query;
        const offset = +page * +perPage;
        const tips = await Tip.find({}).limit(+perPage).skip(offset).sort({ index: -1 });

        return next(appSuccessResponse(res, AppResponseCodeEnum.ok, tips));
    } catch (error) {
        const errorCasted = error as Error;
        return next(appFailResponse(res, errorCasted));
    }
}

export const addTip = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { text } = req.body;
        // get last tip index to increment
        const lastTip = await Tip.findOne({}, {}, { sort: { index: -1 } });
        const currentIndex = lastTip!.index;
        const newIndex = currentIndex + 1;

        const createdTip = await Tip.create({ index: newIndex, text });

        return next(appSuccessResponse(res, AppResponseCodeEnum.created, createdTip));
    } catch (error) {
        const errorCasted = error as Error;
        return next(appFailResponse(res, errorCasted));
    }
};

export const editTip = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { index } = req.params;
        const { text } = req.body;
        const updatedTip = await Tip.findOneAndUpdate({ index }, { text }, { new: true });

        return next(appSuccessResponse(res, AppResponseCodeEnum.modified, updatedTip));
    } catch (error) {
        const errorCasted = error as Error;
        return next(appFailResponse(res, errorCasted));
    }
};

export const deleteTip = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { index } = req.params;
        const deletedTip = await Tip.findOneAndDelete({ index });

        return next(appSuccessResponse(res, AppResponseCodeEnum.modified, deletedTip));
    } catch (error) {
        const errorCasted = error as Error;
        return next(appFailResponse(res, errorCasted));
    }
};
