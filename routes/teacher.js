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
  addDescription,
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
  "/image/:teacherId",
  verifyToken,
  checkUserAuth("teacher"),
  errorCatcher(uploadImage)
);
teacherRouter.post(
  "/additionalInfo/:teacherId",
  verifyToken,
  checkUserAuth("teacher"),
  errorCatcher(signAdditionalInfo)
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
teacherRouter.post(
  "/availability/:teacherId",
  verifyToken,
  checkUserAuth("teacher"),
  errorCatcher(signAvailability)
);
teacherRouter.post(
  "/description/:teacherId",
  verifyToken,
  checkUserAuth("teacher"),
  errorCatcher(addDescription)
);

teacherRouter.get(
  "/getSingleTeacher/:teacherId",
  errorCatcher(getSingleTeacher)
);

module.exports = teacherRouter;
