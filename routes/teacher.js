const express = require("express");

const teacherRouter = express.Router();
const {
  signUp,
  verifyCode,
  signPassword,
  signAbout,
  signAdditionalInfo
  getSingleTeacher,
} = require("../controllers/teacher");
const errorCatcher = require("../middlewares/errorCatcher");

teacherRouter.post("/signup", errorCatcher(signUp));
teacherRouter.post("/signup/code", errorCatcher(verifyCode));
teacherRouter.post("/signup/pass", errorCatcher(signPassword));
teacherRouter.post("/about/:teacherId", errorCatcher(signAbout));
teacherRouter.post("/additionalInfo/:teacherId", errorCatcher(signAdditionalInfo));

teacherRouter.get("/getSingleTeacher/:TeacherId", errorCatcher(getSingleTeacher));

module.exports = teacherRouter;
