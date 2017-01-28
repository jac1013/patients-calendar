'use strict';

import User from '../../models/user';

class UserRegister {
  constructor(email) {
    return User.create({email: email});
  }
}

export default UserRegister;