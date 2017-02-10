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
    this.checkUserStorageToBeSet();
    await this.validateEmail();
    await this.validateUsername();
    const hashedPassword = await this.hashPassword();
    return this.userStorage.create(this.mergeExtraAttributes(hashedPassword))
      .then(this.deletePassword);
  }

  async hashPassword() {
    return this.hashLibrary.hash(this.password, 5);
  }

  mergeExtraAttributes(hashedPassword) {
    return Object.assign(this.additionalAttributes, { email: this.email, password: hashedPassword, username: this.username });
  }

  deletePassword(user) {
    user.password = undefined;
    return user;
  }

  static isRegisterException(exception) {
    return Configurator.isRegisterException(exception);
  }
}

export default Registerer;
