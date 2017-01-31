class Configurator {
  email;
  password;
  userStorage;
  additionalAttributes = {};
  username;

  constructor() {
    return {
      setEmail: this.setEmail,
      validateEmail: this.validateEmail,
      setPassword: this.setPassword,
      validatePassword: this.validatePassword,
      setUserStorage: this.setUserStorage,
      setAdditionalAttributes: this.setAdditionalAttributes,
      setUsername: this.setUsername
    }
  }

  setEmail(email) {
    this.email = email;
    return this;
  }

  validateEmail() {
    var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!regex.test(this.email)) {
      throw {message: 'The email is not valid.'};
    }
  }

  setPassword(password) {
    this.password = password;
    this.validatePassword();
    return this;
  }

  validatePassword() {
    var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    if(!regex.test(this.password)) {
      throw {message: 'The password must contains Minimum 8 characters at least 1 Uppercase Alphabet, 1 Lowercase Alphabet and 1 Number.'};
    }
  }

  setUserStorage(userStorage) {
    this.userStorage = userStorage;
    return this;
  }

  setAdditionalAttributes(attributes) {
    this.additionalAttributes = attributes;
    return this;
  }

  setUsername(username) {
    this.username = username;
    return this;
  }
}

export default Configurator
