const express = require("express");

const teacherRouter = express.Router();
const signUp = require('../controllers/signUp')

teacherRouter.post('/signup', signUp.signUp)
teacherRouter.post('/signup/code', signUp.verifyCode)
teacherRouter.post('/signup/pass', signUp.signPassword)

module.exports = teacherRouter;