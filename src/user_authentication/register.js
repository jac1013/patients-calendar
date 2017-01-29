'use strict';

import bcrypt from 'bcrypt';
import Configuration from './configuration';
import _ from 'lodash';

class Registerer extends Configuration {

  constructor() {
    super();
    this.hashLibrary = bcrypt;
  }

  async register() {
    const hashedPassword = await this.hashPassword();
    return this.userStorage.create(_.extend(this.additionalAttributes, { email: this.email, password: hashedPassword }))
      .then(function(user) {
        user.password = undefined;
        return user;
      });
  }

  async hashPassword() {
    return this.hashLibrary.hash(this.password, 5);
  }
}

export default Registerer;
