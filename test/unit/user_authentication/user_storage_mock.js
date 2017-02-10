'use strict';

import UserStorage from '../../../src/user_authentication/contracts';
import bcrypt from 'bcrypt';

const email = 'mock@email.com';
const password = '123456Ab';
const id = 1;

class MockUserStorage extends UserStorage {
  findOne() {
    return new Promise(function(fulfill) {
      bcrypt.hash(password, 5).then(function(hashedPassword) {
        fulfill({ email: email, password: hashedPassword });
      })
    })
  }

  create() {
    return new Promise((fulfill) => {
      fulfill({ id: id });
    })
  }
}

export default MockUserStorage;
