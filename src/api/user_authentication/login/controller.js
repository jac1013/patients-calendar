import { Login } from 'authentify';
import MongoUserStorage from '../mongo_user_storage';
import httpStatus from 'http-status-codes';
import createToken from '../jwt';

export async function login(ctx) {
  try {
    const user = await new Login()
      .setEmail(ctx.body.email)
      .setPassword(ctx.body.password)
      .setUsername(ctx.body.username)
      .setUserStorage(new MongoUserStorage())
      .authenticate();
    ctx.body = { token: createToken(user) };
  } catch (error) {
    checkForLoginExceptions(ctx, error);
    ctx.throw(httpStatus.INTERNAL_SERVER_ERROR, 'Something went wrong in the server.');
  }
}

function checkForLoginExceptions(context, error) {
  if (Login.isLoginException(error)) {
    context.throw(httpStatus.UNAUTHORIZED, error.message);
  }
}
