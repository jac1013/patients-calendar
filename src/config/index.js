const path = require('path');

const config = {
  env: process.env.NODE_ENV || 'dev',
  root: path.normalize(__dirname + '../../'),
  ip: process.env.IP || 'localhost',
  port: process.env.PORT || 9000,
  logType: process.env.LOGTYPE || 'dev',
  MONGO_USER: process.env.MONGO_LAB_USER,
  MONGO_PASSWORD: process.env.MONGO_LAB_PASSWORD,
  MONGO_DB_URI: process.env.MONGO_LAB_TEST_DB
};

module.exports = config;
