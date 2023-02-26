const express = require("express");

const teacherRouter = express.Router();
const {signUp, verifyCode, signPassword} = require('../controllers/teacher')

teacherRouter.post('/signup', signUp)
teacherRouter.post('/signup/code', verifyCode)
teacherRouter.post('/signup/pass', signPassword)

module.exports = teacherRouter;