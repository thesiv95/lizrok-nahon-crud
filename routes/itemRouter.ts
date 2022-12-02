import { Router } from 'express';
import auth from '../utils/auth';
import * as ItemController from '../controllers/itemController';

const itemRouter = Router();
itemRouter.use(auth);

itemRouter.get('/find', ItemController.findItem);
itemRouter.get('/getAllItems', ItemController.getAllItems);
itemRouter.post('/addItem', ItemController.addItem);
itemRouter.put('/editItem/:id', ItemController.editItem);
itemRouter.delete('/deleteItem/:id', ItemController.deleteItem);

export default itemRouter;