'use strict';

import bcrypt from 'bcrypt';
import Configurator from './configuration';

class Login extends Configurator {
  WRONG_EMAIL_OR_PASSWORD = 'Wrong Credentials, verify them and try again.';
  user;

  constructor() {
    super();
    this.hashLibrary = bcrypt;
  }

  async authenticate() {
    this.user = await this.findByEmailOrUsername();
    this.isUserNotFound();
    await this.isPasswordIncorrect();
    this.user.password = undefined;
    return this.user;
  }

  async findByEmailOrUsername() {
    return await this.userStorage.findOne({email: this.email, username: this.username});
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