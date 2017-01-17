'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _routes = require('./config/routes');

var _routes2 = _interopRequireDefault(_routes);

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _koa3 = require('./config/koa');

var _koa4 = _interopRequireDefault(_koa3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = new _koa2.default();
app.port = _config2.default.port;

(0, _koa4.default)(app);
(0, _routes2.default)(app);

exports.default = app;