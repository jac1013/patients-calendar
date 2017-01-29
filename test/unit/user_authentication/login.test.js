'use strict';

import expect from 'expect.js';
import Login from '../../../src/user_authentication/login';
import MockUserStorage from './user_storage_mock';

const email = 'mock@email.com';
const password = '12345678';

function configureLogin() {
  return new Login()
    .setEmail(email)
    .setPassword(password)
    .setUserStorage(new MockUserStorage())
}

describe('Login', () => {
  let login;
  before(() => {
    login = new Login();
  });

  it('Can set Email', () => {
    login.setEmail(email);
    expect(login.email).to.be(email);
  });

  it('Can set Password', () => {
    login.setPassword(password);
    expect(login.password).to.be(password);
  });

  it('Can set User Storage', () => {
    let mock = new MockUserStorage();
    login.setUserStorage(mock);
    expect(login.userStorage).to.eql(mock);
  });

  it('Must authenticate a user if credentials are correct', () => {
    let loginConfiguration = configureLogin();
    loginConfiguration.authenticate().then(function(result) {
      expect(result.email).to.be(email);

    });
  });
});

export default MockUserStorage