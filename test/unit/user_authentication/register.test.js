import expect from 'expect.js';
import Registerer from '../../../src/user_authentication/register';
import MockUserStorage from './user_storage_mock';

const email = 'mock@email.com';
const password = '123456Ab';
const id = 1;
const name = { name: 'john' };
const username = 'username';


function configureRegister() {
  return new Registerer()
    .setEmail(email)
    .setPassword(password)
    .setUserStorage(new MockUserStorage())
}

describe('Registerer', () => {
  let register;
  before(() => {
    register = new Registerer();
  });

  it('Can set Email', () => {
    register.setEmail(email);
    expect(register.email).to.be(email);
  });

  it('Can set Password', () => {
    register.setPassword(password);
    expect(register.password).to.be(password);
  });

  it('Can set username', () => {
    register.setUsername(username);
    expect(register.username).to.be(username);
  });

  it('Can set Additional attributes', () => {
    register.setAdditionalAttributes(name);
    expect(register.additionalAttributes).to.eql(name);
  });

  it('Can set User Storage', () => {
    let mock = new MockUserStorage();
    register.setUserStorage(mock);
    expect(register.userStorage).to.eql(mock);
  });

  it('Must register a user if the required information is provided', () => {
    let loginConfiguration = configureRegister();
    loginConfiguration.register().then(function(result) {
      expect(result).to.eql({ id: id });
    });
  });
});
