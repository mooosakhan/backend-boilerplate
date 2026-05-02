const express = require("express");
const {
  authenticate,
  authorize,
  checkPermission,
} = require("../../Middleware");

const { ROLES } = require("../../Constant");
const permissions = require("../../permissions.json");

const router = express.Router();

// Example: Get all students
// router.get(
//   "/",
//   authenticate,
//   authorize(ROLES.ADMIN, ROLES.TRAINER),
//   checkPermission(permissions.PERMISSIONS.STUDENT, permissions.CAPABILITIES.READ),
//   getStudents
// );

// Example: Get student by ID
// router.get(
//   "/:studentId",
//   authenticate,
//   authorize(ROLES.ADMIN, ROLES.TRAINER, ROLES.STUDENT),
//   checkPermission(permissions.PERMISSIONS.STUDENT, permissions.CAPABILITIES.READ),
//   getStudentById
// );

// Example: Create student
// router.post(
//   "/",
//   authenticate,
//   authorize(ROLES.ADMIN),
//   checkPermission(permissions.PERMISSIONS.STUDENT, permissions.CAPABILITIES.WRITE),
//   createStudent
// );

// Example: Update student
// router.put(
//   "/:studentId",
//   authenticate,
//   authorize(ROLES.ADMIN, ROLES.STUDENT),
//   checkPermission(permissions.PERMISSIONS.STUDENT, permissions.CAPABILITIES.UPDATE),
//   updateStudent
// );

// Example: Delete student
// router.delete(
//   "/:studentId",
//   authenticate,
//   authorize(ROLES.ADMIN),
//   checkPermission(permissions.PERMISSIONS.STUDENT, permissions.CAPABILITIES.DELETE),
//   deleteStudent
// );

module.exports = router;
