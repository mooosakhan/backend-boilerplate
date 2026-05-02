const { authenticate } = require("./Authenticate");
const { authorize } = require("./Authorize");
const { tokenVerification } = require("./TokenVerification");
const { Authentication } = require("./Authentication");
const { checkPermission } = require("./CheckPermission");

module.exports = {
  authenticate,
  authorize,
  tokenVerification,
  Authentication,
  checkPermission,
};
