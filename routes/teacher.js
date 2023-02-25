const express = require("express");

const teacherRouter = express.Router();
const signUp = require('../controllers/teacher')
const logout = require("../middlewares/logout")

teacherRouter.post('/signup', signUp.signUp)
teacherRouter.post('/signup/code', signUp.verifyCode)
teacherRouter.post('/signup/pass', signUp.signPassword)
teacherRouter.post('/logout', logout)

module.exports = teacherRouter;