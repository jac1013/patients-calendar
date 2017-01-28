'use strict';

import { signup } from './controller';
import router from 'koa-router';

class RegisterRouter extends router {
  URL = '/register';

  constructor() {
    super();
    this.prefix(this.URL);
    this.configure();
  }

  configure() {
    this.post('/', signup);
  }
}

export default new RegisterRouter();
