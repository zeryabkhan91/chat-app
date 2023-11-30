const { UserUtil } = require('../../utilities') 

class UserManager {
  static getUser(user) {

    user = UserUtil.transformUserData(user);

    console.log(`getUser:: User's data successfully fetched. user ${user}`);

    return user;
  }
}

module.exports = UserManager;