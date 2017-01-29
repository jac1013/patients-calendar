'use strict';

import bcrypt from 'bcrypt';
import Configurator from './configuration';
import _ from 'lodash';

class Registerer extends Configurator {

  constructor() {
    super();
    this.hashLibrary = bcrypt;
  }

  async register() {
    this.validateEmail();
    const hashedPassword = await this.hashPassword();
    return this.userStorage.create(this.mergeExtraAttributes(hashedPassword))
      .then(this.deletePassword);
  }

  mergeExtraAttributes(hashedPassword) {
    return _.extend(this.additionalAttributes, { email: this.email, password: hashedPassword, username: this.username });
  }

  deletePassword(user) {
    user.password = undefined;
    return user;
  }

  async hashPassword() {
    return this.hashLibrary.hash(this.password, 5);
  }
}

export default Registerer;
