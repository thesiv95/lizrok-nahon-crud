import Item from "../models/itemModel";
import Tip from "../models/tipsModel";
import list from '../data/list.json';
import tips from '../data/tips.json';
import admins from '../data/admins.json';
import dbInit from "../utils/dbInit";
import mongoose from "mongoose";

const action = async () => {
    console.log('**** DB restore ****');
    console.log('>> Deleting the existing collections...');
    await Item.deleteMany({});
    await Tip.deleteMany({});
    console.log('>> Adding all items from the list...');
    await Item.insertMany(list);
    console.log('>> Adding all items from the tips...');
    await Tip.insertMany(tips);
    console.log('**** Done! ****');
};



dbInit()
    .then(() => action())
    .catch((err) => console.error(`error ${err}`))
    .finally(() => mongoose.connection.close());
