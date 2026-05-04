import express, { Router } from "express";
import {
  authenticate,
  authorize,
  checkPermission,
} from "../../Middleware/index.js";
import getUsers from "./GetUsers/index.js";
import updateUser from "./UpdateUser/index.js";
import deleteUser from "./DeleteUser/index.js";
import login from "./Login/index.js";
import signUp from "./Signup/index.js";
import { ROLES } from "../../Constant/index.js";

const permissions = {
  PERMISSIONS: {
    USER: "USER",
  },
  CAPABILITIES: {
    READ: "READ",
    WRITE: "WRITE",
    UPDATE: "UPDATE",
    DELETE: "DELETE",
  },
};

const router: Router = express.Router();

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

export default router;
