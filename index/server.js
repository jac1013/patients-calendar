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

var _jwt = require('./config/jwt');

var _jwt2 = _interopRequireDefault(_jwt);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _koaBodyparser = require('koa-bodyparser');

var _koaBodyparser2 = _interopRequireDefault(_koaBodyparser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('babel-runtime/core-js/promise').default = _bluebird2.default;

var app = new _koa2.default();
app.port = _config2.default.port;

app.use((0, _koaBodyparser2.default)());

// app.use((ctx) => {
//   const body = JSON.stringify(ctx.request.body);
//   ctx.type = 'text/plain'
//   ctx.body = `You sent: ${body}`
// });

(0, _koa4.default)(app);
(0, _routes2.default)(app);
(0, _jwt2.default)(app);

_mongoose2.default.Promise = _bluebird2.default;
_mongoose2.default.connect('mongodb://jac:10131013j@ds131729.mlab.com:31729/patients_calendar');

exports.default = app;