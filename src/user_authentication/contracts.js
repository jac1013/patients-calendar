'use strict';

/**
 * We just need to extend this class and implement both methods
 * with whatever library DB we are using.
 */
class UserStorage {
  findOne(criteria) {}
  create(attributes) {}
}

export default UserStorage;
