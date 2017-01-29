'use strict';

import UserStorage from '../../user_authentication/contracts';
import User from '../../models/user';
import _ from 'lodash';

/**
 * This is an example of an implementation with MongoDB.
 * In this case we used mongoose.
 */
class MongoUserStorage extends UserStorage {
  findOne(criteria) {
    return User.findOne({$or: this.transformArgumentsForOrOperator(criteria)});
  }

  transformArgumentsForOrOperator(criteria) {
    return _.map(criteria, (value, key) => {
      let object = {};
      object[key] = value;
      return object;
    })
  }

  create(attributes) {
    return User.create(attributes);
  }
}

export default MongoUserStorage;