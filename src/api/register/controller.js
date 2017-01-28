'use strict';

import UserRegister from './model';
var debug = require('debug')('http')

export async function signup(ctx, next) {
  try {
    ctx.body = await new UserRegister(ctx.request.body.email);
    ctx.message = 'User was created';
    await next();
  } catch(error) {
    ctx.status = 503;
    ctx.body = error;
  }

}