import { Registerer } from 'authentify';
import MongoUserStorage from '../mongo_user_storage';
import httpStatus from 'http-status-codes';

export async function signUp(ctx, next) {
  try {
    ctx.body = await new Registerer()
      .setEmail(ctx.body.email)
      .setUsername(ctx.body.username)
      .setPassword(ctx.body.password)
      .setUserStorage(new MongoUserStorage())
      .register();
    ctx.message = 'User was created';
    await next();
  } catch (error) {
    checkForRegisterException(ctx, error);
    ctx.throw(httpStatus.INTERNAL_SERVER_ERROR, 'Something went wrong in the server.');
  }
}

function checkForRegisterException(context, error) {
  if (Registerer.isRegisterException(error)) {
    context.throw(httpStatus.BAD_REQUEST, error.message);
  }
}
