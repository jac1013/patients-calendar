import mongoose from 'mongoose';
import Promise from 'bluebird';

const config = {
  USER: process.env.MONGO_USER,
  PASSWORD: process.env.MONGO_PASSWORD,
  PORT: process.env.MONGO_PORT,
  URL: `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@ds131729.mlab.com:${process.env.MONGO_PORT}/${process.env.MONGO_DB_NAME}`
};

function configureDB() {
  mongoose.Promise = Promise;
  mongoose.connect(config.URL);
}

export { config as default, configureDB };
