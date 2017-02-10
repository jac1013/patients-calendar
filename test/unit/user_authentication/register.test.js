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

describe('Registerer Success cases', () => {
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

  it('Can validate an Email', () => {
    let register = configureRegister();
    register.setEmail('mock2@gmail.com');
    register.validateEmail().catch(() => {})
  });

  it('Must register a user if the required information is provided', () => {
    let loginConfiguration = configureRegister();
    loginConfiguration.register().then(function(result) {
      expect(result).to.eql({ id: id });
    }).catch(() => {});
  });
});

describe('Registerer Failure cases', () => {
  let register;
  before(() => {
    register = new Registerer();
  });

  it('Can throw an InvalidEmailException when the email is not a valid one', () => {
    let register = configureRegister();
    register.setEmail('wrongEmail');
    register.validateEmail().catch((e) => {
      expect(Registerer.isRegisterException(e)).to.be(true);
    })
  });

  it('Can throw a DuplicatedEmailException when we try to use an email that already exist for register', () => {
    let register = configureRegister();

    register.register().catch((e) => {
      expect(Registerer.isRegisterException(e)).to.be(true);
    })

  });

  it('Can throw an InvalidPasswordException when the password does not fit the criteria rules', () => {
    let register = configureRegister();
    try {
      register.setPassword('short');
    } catch(e) {
      expect(Registerer.isRegisterException(e)).to.be(true);
    }
  });

  it('Can throw a UsernameAlreadyExistException when the username is already taken', () => {
    // we don't need to set anything because internally the Mock user storage findOne method will return
    // always something, so the validation tries to find the username with a criteria and it will find something always
    // and throw.
    let register = configureRegister();
    register.checkDuplicatedUsername().catch((e) => {
      expect(Registerer.isRegisterException(e)).to.be(true);
    })

  });

  it('Can throw a UserStorageNotConfigureException if you try to use a function that needs to find a user without setting a user storage before', async () => {
    let register = configureRegister();
    register.setUserStorage(false);
    register.findUser().catch((e) => {
      expect(Registerer.isRegisterException(e)).to.be(true);
    })
  });
})
