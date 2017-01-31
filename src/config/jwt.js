import jwt from 'koa-jwt'
import secret from './secret'

export default async function configureJWT(app) {
    app.use(jwt({secret: secret}).unless({path: ['/', '/authorize', '/register']}));
}
