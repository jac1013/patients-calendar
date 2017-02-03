import mongoose from 'mongoose';
import Promise from 'bluebird';
import config from './';

export default function configureMongoDB () {
  mongoose.Promise = Promise;
  mongoose.connect(config.MONGO_DB_URI);
}
