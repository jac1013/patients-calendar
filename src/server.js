import configRoutes from './config/routes';
import Koa from 'koa';
import KoaConfigurator from './config/koa';
import configureJWT from './config/jwt';
import {configureDB} from './config/database';

const app = new Koa();

new KoaConfigurator(app);
configRoutes(app);
configureDB();
configureJWT(app);

export default app;
