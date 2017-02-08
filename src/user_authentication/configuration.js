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
      setUsername: this.setUsername,
      additionalAttributes: {},
    }
  }

  setEmail(email) {
    this.email = email;
    return this;
  }

  validateEmail() {
    var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!regex.test(this.email)) {
      throw new InvalidEmailException();
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
      throw new InvalidPasswordException();
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

  static isRegisterException(exception) {
    return exception instanceof InvalidEmailException || exception instanceof InvalidPasswordException;
  }
}

class InvalidEmailException {
  INVALID_EMAIL = 'The email is not valid.';
  message;

  constructor() {
    this.message = this.INVALID_EMAIL;
  }
}

class InvalidPasswordException {
  INVALID_PASSWORD = 'The password must contains Minimum 8 characters at least 1 Uppercase Alphabet, 1 Lowercase Alphabet and 1 Number.';
  message;

  constructor() {
    this.message = this.INVALID_PASSWORD;
  }
}

export default Configurator
