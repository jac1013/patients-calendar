import Login from '../../../user_authentication/login'
import MongoUserStorage from '../mongo_user_storage';
import httpStatus from 'http-status-codes';
import createToken from '../jwt';

export async function login(ctx) {
  try {
    var user = await new Login()
      .setEmail(ctx.body.email)
      .setPassword(ctx.body.password)
      .setUsername(ctx.body.username)
      .setUserStorage(new MongoUserStorage())
      .authenticate();
    ctx.body = {token: createToken(user)};

  } catch(error) {
    ctx.throw(httpStatus.UNAUTHORIZED, error.message);
  }

}
