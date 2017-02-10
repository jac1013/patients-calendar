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
      checkDuplicatedEmail: this.checkDuplicatedEmail,
      findUser: this.findUser,
      checkUserStorageToBeSet: this.checkUserStorageToBeSet,
      setPassword: this.setPassword,
      validatePassword: this.validatePassword,
      setUserStorage: this.setUserStorage,
      setAdditionalAttributes: this.setAdditionalAttributes,
      setUsername: this.setUsername,
      validateUsername: this.validateUsername,
      checkDuplicatedUsername: this.checkDuplicatedUsername,
      additionalAttributes: {},
    }
  }

  setEmail(email) {
    this.email = email;
    return this;
  }

  async validateEmail(emailRegex) {
    emailRegex = emailRegex || /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    await this.checkDuplicatedEmail();
    if (!emailRegex.test(this.email)) {
      throw new InvalidEmailException();
    }
  }

  async checkDuplicatedEmail() {
    let user = await this.findUser({email: this.email});
    if (user) {
      throw new EmailAlreadyExistException();
    }
  }

  async findUser(criteria) {
    this.checkUserStorageToBeSet();
    return await this.userStorage.findOne(criteria);
  }

  checkUserStorageToBeSet() {
    if(!this.userStorage) {
      throw new UserStorageNotConfigureException();
    }
  }

  setPassword(password) {
    this.password = password;
    this.validatePassword();
    return this;
  }

  validatePassword(passwordRegex) {
    passwordRegex = passwordRegex || /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    if (!passwordRegex.test(this.password)) {
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

  async validateUsername() {
    return await this.checkDuplicatedUsername();
  }

  async checkDuplicatedUsername() {
    let user = await this.findUser({ username: this.username });
    if (user) {
      throw new UsernameAlreadyExistException();
    }
  }

  static isRegisterException(exception) {
    return exception instanceof InvalidEmailException || exception instanceof InvalidPasswordException
      || exception instanceof EmailAlreadyExistException || exception instanceof UsernameAlreadyExistException
      || exception instanceof UserStorageNotConfigureException;
  }
}

class InvalidEmailException {
  message = 'The email is not valid.';
}

class InvalidPasswordException {
  message = 'The password must contains Minimum 8 characters at least 1 Uppercase Alphabet, 1 Lowercase Alphabet and 1 Number.';
}

class EmailAlreadyExistException {
  message = 'The email is already chosen.';
}

class UsernameAlreadyExistException {
  message = 'The username is already chosen.';
}

class UserStorageNotConfigureException {
  message = 'You must set a User Storage before calling functions that require to find a user.';
}

export default Configurator
