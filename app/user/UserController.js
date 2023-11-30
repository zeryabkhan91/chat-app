const UserManager = require("./UserManager");

const { Validators } = require("../../helpers");

const { ErrorCodes, UserConstants } = require("../../constants");

class UserController {
  static async getUser(_, res) {
    try {
      const user = await UserManager.getUser();

      res.json({
        success: true,
        data: user,
      });
    } catch (err) {
      console.log(`getUser:: Request to fetch user failed.`, err);

      return res
        .status(
          Validators.validateCode(err.code, ErrorCodes.INTERNAL_SERVER_ERROR) ||
            ErrorCodes.INTERNAL_SERVER_ERROR
        )
        .json({
          success: false,
          message: err.reportError
            ? err.message
            : UserConstants.MESSAGES.FETCHING_USER_FAILED,
        });
    }
  }
}

module.exports = UserController;
