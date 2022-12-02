import { config } from 'dotenv';
import { connect } from 'mongoose';
import logger from './logger';

config();

const dbInit = async () => {
   try {
       const dbURL = process.env.MONGO_URL as string;
       return connect(dbURL);
    } catch (error) {
       logger.error(`mongoose error: ${error}`);
   }
};

export default dbInit;
