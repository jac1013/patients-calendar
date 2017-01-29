'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = configKoa;

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

var _koaMorgan = require('koa-morgan');

var _koaMorgan2 = _interopRequireDefault(_koaMorgan);

var _koaBodyparser = require('koa-bodyparser');

var _koaBodyparser2 = _interopRequireDefault(_koaBodyparser);

var _koaCompress = require('koa-compress');

var _koaCompress2 = _interopRequireDefault(_koaCompress);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function configKoa(app) {
  app.use((0, _koaCompress2.default)());
  app.use((0, _koaBodyparser2.default)({
    strict: false
  }));

  app.use(function (ctx, next) {
    ctx.body = ctx.request.body;
    return next();
  });

  app.on('error', function (err) {
    return console.error(err);
  });

  app.use((0, _koaMorgan2.default)(_index2.default.logType));
}