'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _routes = require('./config/routes');

var _routes2 = _interopRequireDefault(_routes);

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _koa3 = require('./config/koa');

var _koa4 = _interopRequireDefault(_koa3);

var _jwt = require('./config/jwt');

var _jwt2 = _interopRequireDefault(_jwt);

var _database = require('./config/database');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = new _koa2.default();

new _koa4.default(app);
(0, _routes2.default)(app);
(0, _database.configureDB)();
(0, _jwt2.default)(app);

exports.default = app;