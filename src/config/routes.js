import mount from 'koa-mount';
import { root } from '../api';
import loginRouter from '../api/user_authentication/login';
import registerRouter from '../api/user_authentication/register';

export default function configRoutes(app) {
  app.use(mount('/', root.routes()));
  app.use(loginRouter.routes());
  app.use(registerRouter.routes());
}
