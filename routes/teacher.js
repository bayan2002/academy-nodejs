const express = require("express");

const teacherRouter = express.Router();
const {
  signUp,
  verifyCode,
  signPassword,
  signAbout,
} = require("../controllers/teacher");
const errorCatcher = require("../middlewares/errorCatcher");

teacherRouter.post("/signup", errorCatcher(signUp));
teacherRouter.post("/signup/code", errorCatcher(verifyCode));
teacherRouter.post("/signup/pass", errorCatcher(signPassword));
teacherRouter.post("/about/:teacherId", errorCatcher(signAbout));

module.exports = teacherRouter;
