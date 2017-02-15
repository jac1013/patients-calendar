import configRoutes from './config/routes';
import Koa from 'koa';
import configureKoa from './config/koa';
import configureJWT from './config/jwt';
import { configureDB } from './config/database';

const app = new Koa();

configureKoa(app);
configRoutes(app);
configureDB();
configureJWT(app);

export default app;
