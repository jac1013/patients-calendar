import expect from 'expect.js';
import Registerer from '../../../src/user_authentication/register';
import MockUserStorage from './user_storage_mock';

const email = 'mock@email.com';
const password = '123456Ab';
const id = 1;
const username = 'username';
const fakePassword = 'fakePassword';


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

  it('Must register a user if the required information is provided', (done) => {
    let register = configureRegister();
    register.register().then(function(result) {
      expect(result).to.eql({ id: id });
      done();
    }).catch(() => {
      done();
    });
  });

  it('Must be able to hash a password', (done) => {
    let register = configureRegister();
    register.hashPassword()
      .then(function(hashedPassword) {
        expect(hashedPassword).to.be('string');
        done()
      }).catch(() => {
      done();
    });
  });

  it('Must be able to merge additional attributes', () => {
    let register = configureRegister();
    register.setAdditionalAttributes({ test: 'test' });
    expect(register.mergeExtraAttributes(fakePassword)).to.eql({
      email: register.email,
      password: fakePassword,
      test: 'test',
      username: undefined
    });
  });

  it('Must be able to delete the password attribute', () => {
    let register = configureRegister();
    expect(register.deletePassword({ password: fakePassword })).to.eql({ password: undefined });
  });
});

describe('Registerer Failure cases', () => {
  let register;
  before(() => {
    register = new Registerer();
  });

  it('Must throw a DuplicatedEmailException when we try to use an email that already exist for register', (done) => {
    let register = configureRegister();
    register.register().catch((e) => {
      expect(Registerer.isRegisterException(e)).to.be(true);
      done();
    });
  });

  it('Must throw a UserStorageNotConfigureException if you try to use register a user before setting the User Storage', (done) => {
    let register = configureRegister();
    register.setUserStorage(false);
    register.register().catch((e) => {
      expect(Registerer.isRegisterException(e)).to.be(true);
      done();
    });
  });

  it('Must throw a DuplicatedEmailException when we try to use an email that already exist for the configuration', (done) => {
    let register = configureRegister();

    register.checkDuplicatedEmail().catch((e) => {
      expect(Registerer.isRegisterException(e)).to.be(true);
      done();
    })

  });

  it('Must throw a UsernameAlreadyExistException when the username is already taken', (done) => {
    // we don't need to set anything because internally the Mock user storage findOne method will return
    // always something, so the validation tries to find the username with a criteria and it will find something always
    // and throw.
    let register = configureRegister();
    register.checkDuplicatedUsername().catch((e) => {
      expect(Registerer.isRegisterException(e)).to.be(true);
      done();
    })

  });

  it('Must throw a UserStorageNotConfigureException if you try find a user without setting a User Storage', (done) => {
    let register = configureRegister();
    register.setUserStorage(false);
    register.findUser().catch((e) => {
      expect(Registerer.isRegisterException(e)).to.be(true);
      done();
    })
  });
})
