'use strict';

import Login from './model'
import jwt from 'koa-jwt'
import secret from '../../config/secret';

export async function login(ctx, next) {
  let token = await new Login({
    email: ctx.body.email,
    jwt: jwt,
    secret: secret,
  });

  if (!token)
    ctx.throw(401, 'Wrong username or password');

  ctx.status = 200;
  ctx.body = {token: token};
  await next();
}