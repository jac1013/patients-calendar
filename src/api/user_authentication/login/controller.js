import Login from '../../../user_authentication/login'
import MongoUserStorage from '../mongo_user_storage';
import httpStatus from 'http-status-codes';

export async function login(ctx) {
  try {
    ctx.body = await new Login()
      .setEmail(ctx.body.email)
      .setPassword(ctx.body.password)
      .setUsername(ctx.body.username)
      .setUserStorage(new MongoUserStorage())
      .authenticate();
  } catch(error) {
    ctx.throw(httpStatus.UNAUTHORIZED, error.message);
  }

}