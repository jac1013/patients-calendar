'use strict';
import User from '../../models/user';

class Login {
  constructor(authenticateConfiguration) {
    this.email = authenticateConfiguration.email;
    this.jwt = authenticateConfiguration.jwt;
    this.secret = authenticateConfiguration.secret;
    return this.authenticate();
  }

  async authenticate() {
    let user = await User.find({email: this.email});
    if (user) {
      let claim = { user: user };
      return this.jwt.sign(claim, this.secret);
    }
  }
}

export default Login;