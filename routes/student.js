const express = require("express");

const studentRouter = express.Router();
const {
  signUp,
  signPassword,
  signData,
  getStudents,
  getSingleStudent,
  getLastTenStudent,
  verifyCode,
  editPersonalInformation,
  editImageStudent,
} = require("../controllers/student");
const checkUserAuth = require("../middlewares/checkUserAuth");
const verifyToken = require("../middlewares/verifyToken");
const errorCatcher = require("../middlewares/errorCatcher");

studentRouter.post("/signup", errorCatcher(signUp));
studentRouter.post("/signup/code", errorCatcher(verifyCode));
studentRouter.post("/signup/pass", errorCatcher(signPassword));
studentRouter.post("/signup/data", errorCatcher(signData));
studentRouter.post(
  "/editAbout/:StudentId",
  verifyToken,
  checkUserAuth("student"),
  errorCatcher(editPersonalInformation)
);
studentRouter.post(
  "/editImage/:StudentId",
  verifyToken,
  checkUserAuth("student"),
  errorCatcher(editImageStudent)
);
studentRouter.get("/all", errorCatcher(getStudents));
studentRouter.get("/get/:studentId", errorCatcher(getSingleStudent));
studentRouter.get(
  "/getLastTen",
  verifyToken,
  checkUserAuth("admin"),
  errorCatcher(getLastTenStudent)
);

module.exports = studentRouter;
