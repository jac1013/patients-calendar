import koaJWT from 'koa-jwt';
import secret from './secret';

const JWT_EXCEPTION_RULES = ['/', '/login', '/register'];

function presetSecret(app) {
  app.use(async (ctx, next) => {
    ctx.state.secret = secret;
    await next();
  });
}

function initialize(app) {
  app.use(koaJWT().unless({ path: JWT_EXCEPTION_RULES }));
}

export default function configureJWT(app) {
  presetSecret(app);
  initialize(app);
}
