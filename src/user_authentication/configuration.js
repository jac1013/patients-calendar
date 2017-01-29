'use strict';

class Configuration {
  email;
  password;
  userStorage;
  additionalAttributes;

  setEmail(email) {
    this.email = email;
    return this;
  }

  setPassword(password) {
    this.password = password;
    return this;
  }

  setUserStorage(userStorage) {
    this.userStorage = userStorage;
    return this;
  }

  setAdditionalAttributes(attributes) {
    this.additionalAttributes = attributes;
    return this;
  }
}

export default Configuration