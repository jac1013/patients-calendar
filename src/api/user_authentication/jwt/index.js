import jwt from 'jsonwebtoken';
import secret from '../../../config/secret';

export default function createToken(user) {
  return jwt.sign(user, secret);
}
