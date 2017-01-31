import config from './config';
import configRoutes from './config/routes';
import Koa from 'koa';
import configKoa from './config/koa';
import configureJWT from './config/jwt';
import configureMongoDB from './config/database';

const app = new Koa();
app.port = config.port;

// app.use((ctx) => {
//   const body = JSON.stringify(ctx.request.body);
//   ctx.type = 'text/plain'
//   ctx.body = `You sent: ${body}`
// });

configKoa(app);
configRoutes(app);
configureMongoDB();
configureJWT(app);

export default app;
