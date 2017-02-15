import path from 'path';

const config = {
  env: process.env.NODE_ENV || 'dev',
  root: path.normalize(__dirname + '../../'), //eslint-disable-line
  ip: process.env.IP || 'localhost',
  port: process.env.PORT || 9000,
  logType: process.env.LOGTYPE || 'dev',
};

export default config;
