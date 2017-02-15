import config from './index';
import morgan from 'koa-morgan';
import parser from 'koa-bodyparser';
import compress from 'koa-compress';

class KoaConfigurator {
  app;
  constructor(app) {
    this.app = app;
    this.app.port = config.port;
    this.compression();
    this.bodyParser();
    this.aliasForRequestBody();
    this.standardErrorLogger();
    this.httpRequestsLogger();
  }

  compression() {
    this.app.use(compress());
  }

  bodyParser() {
    this.app.use(parser({
      strict: false
    }));
  }

  aliasForRequestBody() {
    this.app.use(async(ctx, next) => {
      ctx.body = ctx.request.body;
      await next();
    });
  }

  standardErrorLogger() {
    this.app.on('error', err => console.error(err));
  }

  httpRequestsLogger() {
    this.app.use(morgan(config.logType));
  }
}

export default function configureKoa(app) {
  return new KoaConfigurator(app);
}
