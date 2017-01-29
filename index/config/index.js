'use strict';

var path = require('path');

var config = {
  env: process.env.NODE_ENV || 'dev',
  root: path.normalize(__dirname + '../../'),
  ip: process.env.IP || 'localhost',
  port: process.env.PORT || 9000,
  logType: process.env.LOGTYPE || 'dev'
};

module.exports = config;