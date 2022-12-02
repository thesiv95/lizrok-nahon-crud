import { Request, Response, NextFunction } from 'express';
import { AppResponseCodeEnum } from '../enums/app-response-code.enum';
import { appSuccessResponse, appFailResponse } from '../utils/response';
import Item from '../models/itemModel';

export const findItem = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let itemFound = false;
        let categoryNeeded = null;
        let item = req.query.item as string;
        item = item.trim();

        const itemRecord = await Item.findOne({ item: { $regex: item, $options: 'i' } });

        if (itemRecord) {
            categoryNeeded = itemRecord.category;
            itemFound = true;
        }

        return next(appSuccessResponse(res, AppResponseCodeEnum.ok, {
            itemFound,
            categoryNeeded
        }));
    } catch (error) {
        const errorCasted = error as Error;
        return next(appFailResponse(res, errorCasted));
    }
};

// ADMIN PANEL
export const getAllItems = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { page = 1, perPage = 10 } = req.query;
        const offset = +page * +perPage;
        const items = await Item.find({}).limit(+perPage).skip(offset);

        return next(appSuccessResponse(res, AppResponseCodeEnum.ok, items));
    } catch (error) {
        const errorCasted = error as Error;
        return next(appFailResponse(res, errorCasted));
    }
}

export const addItem = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { item, category } = req.body;
        const createdItem = await Item.create({ item, category });

        return next(appSuccessResponse(res, AppResponseCodeEnum.created, createdItem));
    } catch (error) {
        const errorCasted = error as Error;
        return next(appFailResponse(res, errorCasted));
    }
};

export const editItem = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const { item, category } = req.body;
        const editedItem = await Item.findByIdAndUpdate({_id: id}, { item, category }, { new: true });

        return next(appSuccessResponse(res, AppResponseCodeEnum.modified, editedItem));
    } catch (error) {
        const errorCasted = error as Error;
        return next(appFailResponse(res, errorCasted));
    }
};

export const deleteItem = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const deletedItem = await Item.findByIdAndDelete(id);

        return next(appSuccessResponse(res, AppResponseCodeEnum.modified, deletedItem));
    } catch (error) {
        const errorCasted = error as Error;
        return next(appFailResponse(res, errorCasted));
    }
};
