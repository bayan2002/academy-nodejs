const express = require("express");

const teacherRouter = express.Router();
const {
  signUp,
  verifyCode,
  signPassword,
  signAbout,
  signAdditionalInfo,
  getSingleTeacher,
  signResume,
  signAvailability,
  addSubjects,
  uploadImage,
} = require("../controllers/teacher");
const errorCatcher = require("../middlewares/errorCatcher");
const verifyToken = require("../middlewares/verifyToken");
const checkUserAuth = require("../middlewares/checkUserAuth");

teacherRouter.post("/signup", errorCatcher(signUp));
teacherRouter.post("/signup/code", errorCatcher(verifyCode));
teacherRouter.post("/signup/pass", errorCatcher(signPassword));

teacherRouter.post(
  "/about/:teacherId",
  verifyToken,
  checkUserAuth("teacher"),
  errorCatcher(signAbout)
);
teacherRouter.post(
  "/additionalInfo/:teacherId",
  verifyToken,
  checkUserAuth("teacher"),
  errorCatcher(signAdditionalInfo)
);
teacherRouter.post(
  "/image/:teacherId",
  verifyToken,
  checkUserAuth("teacher"),
  errorCatcher(uploadImage)
);
teacherRouter.post(
  "/subjects/:teacherId",
  verifyToken,
  checkUserAuth("teacher"),
  errorCatcher(addSubjects)
);

teacherRouter.post(
  "/resume/:teacherId",
  verifyToken,
  checkUserAuth("teacher"),
  errorCatcher(signResume)
);

teacherRouter.get(
  "/getSingleTeacher/:teacherId",
  errorCatcher(getSingleTeacher)
);

module.exports = teacherRouter;
