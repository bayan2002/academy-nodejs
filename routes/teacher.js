const express = require("express");

const teacherRouter = express.Router();
const {signUp, verifyCode, signPassword} = require('../controllers/teacher');
const errorCatcher = require("../middlewares/errorCatcher");

teacherRouter.post('/signup', errorCatcher(signUp))
teacherRouter.post('/signup/code', errorCatcher(verifyCode))
teacherRouter.post('/signup/pass', errorCatcher(signPassword))

module.exports = teacherRouter;