'use strict';

import mount from 'koa-mount';
import { root } from '../api';
import loginRouter from '../api/authentication';
import registerRouter from '../api/register';

export default function configRoutes(app) {
  app.use(mount('/', root.routes()));
  app.use(loginRouter.routes());
  app.use(registerRouter.routes());
  // List Endpoints Here
}
