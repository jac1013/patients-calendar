'use strict';

import bcrypt from 'bcrypt';
import Configuration from './configuration';

class Login extends Configuration {
  WRONG_EMAIL_OR_PASSWORD = 'Wrong email address or password.';
  user;

  constructor() {
    super();
    this.hashLibrary = bcrypt;
  }

  async authenticate() {
    this.user = await this.userStorage.findOne({email: this.email});
    this.isUserNotFound();
    await this.isPasswordIncorrect();
    this.user.password = undefined;
    return this.user;

  }

  isUserNotFound() {
    if (!this.user) {
      this.throwWrongCredentials();
    }
  }

  throwWrongCredentials() {
    throw {message: this.WRONG_EMAIL_OR_PASSWORD};
  }

  async isPasswordIncorrect() {
    let isPasswordCorrect = await this.hashLibrary.compare(this.password, this.user.password);
    if(!isPasswordCorrect) {
      this.throwWrongCredentials();
    }
  }
}

export default Login;