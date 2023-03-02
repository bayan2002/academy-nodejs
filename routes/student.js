const express = require("express");

const studentRouter = express.Router();
const {signUp, verifyCode, signPassword, signData, getStudents, getSingleStudent} = require("../controllers/student");
const errorCatcher = require("../middlewares/errorCatcher");

studentRouter.post("/signup", errorCatcher(signUp));
studentRouter.post("/signup/code", errorCatcher(verifyCode));
studentRouter.post("/signup/pass", errorCatcher(signPassword));
studentRouter.post("/signup/data", errorCatcher(signData));
studentRouter.post("/all", errorCatcher(getStudents));
studentRouter.post("singleStudent/:studentId", errorCatcher(getSingleStudent));

module.exports = studentRouter;
