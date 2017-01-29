'use strict';

import { login } from './controller';
import router from 'koa-router';

class LoginRouter extends router {
  URL = '/authorize';

  constructor() {
    super();
    this.prefix(this.URL);
    this.configure();
  }

  configure() {
    this.post('/', login);
  }
}

export default new LoginRouter();