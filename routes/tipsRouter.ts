import { Router } from 'express';
import auth from '../utils/auth';
import * as TipsController from '../controllers/tipsController';

const tipsRouter = Router();
tipsRouter.use(auth);

tipsRouter.get('/find', TipsController.findTip);
tipsRouter.get('/getAllTips', TipsController.getAllTips);
tipsRouter.post('/addTip', TipsController.addTip);
tipsRouter.put('/editTip/:index', TipsController.editTip);
tipsRouter.delete('/deleteTip/:index', TipsController.deleteTip);

export default tipsRouter;
