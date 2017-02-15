import { UserStorage } from 'authentify';
import User from '../../models/user';

/**
 * This is an example of an implementation with MongoDB.
 * In this case we used mongoose.
 */
class MongoUserStorage extends UserStorage {
  findOne(criteria) {
    return User.findOne(criteria);
  }

  create(attributes) {
    return User.create(attributes);
  }
}

export default MongoUserStorage;
