const express = require("express");
const {
  authenticate,
  authorize,
  checkPermission,
} = require("../../Middleware");
const getUsers = require("./GetUsers");
const updateUser = require("./UpdateUser");
const deleteUser = require("./DeleteUser");
const login = require("./Login");
const signUp = require("./Signup");

const { ROLES } = require("../../Constant");
const permissions = require("../../permissions.json");

const router = express.Router();

router.get(
  "/users",
  authenticate,
  authorize(ROLES.ADMIN),
  checkPermission(permissions.PERMISSIONS.USER, permissions.CAPABILITIES.READ),
  getUsers
);

router.post("/login", login);

router.post(
  "/register",
  authenticate,
  authorize(ROLES.ADMIN),
  checkPermission(permissions.PERMISSIONS.USER, permissions.CAPABILITIES.WRITE),
  signUp
);

router.put(
  "/users",
  authenticate,
  authorize(ROLES.ADMIN),
  checkPermission(
    permissions.PERMISSIONS.USER,
    permissions.CAPABILITIES.UPDATE
  ),
  updateUser
);

router.delete(
  "/users",
  authenticate,
  authorize(ROLES.ADMIN),
  checkPermission(
    permissions.PERMISSIONS.USER,
    permissions.CAPABILITIES.DELETE
  ),
  deleteUser
);

module.exports = router;
