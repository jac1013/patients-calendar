import bcrypt from 'bcrypt';
import Configurator from './configuration';

class Registerer {
  email;
  username;
  password;

  constructor() {
    Object.assign(this, new Configurator());
    this.hashLibrary = bcrypt;
  }

  async register() {
    this.validateEmail();
    const hashedPassword = await this.hashPassword();
    return this.userStorage.create(this.mergeExtraAttributes(hashedPassword))
      .then(this.deletePassword);
  }

  mergeExtraAttributes(hashedPassword) {
    return Object.assign(this.additionalAttributes, { email: this.email, password: hashedPassword, username: this.username });
  }

  deletePassword(user) {
    user.password = undefined;
    return user;
  }

  async hashPassword() {
    return this.hashLibrary.hash(this.password, 5);
  }

  static isRegisterException(exception) {
    return Configurator.isRegisterException(exception);
  }
}

export default Registerer;
