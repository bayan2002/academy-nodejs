const express = require("express");

const studentRouter = express.Router();
const signUp = require('../controllers/student')

studentRouter.post('/signup', signUp.signUp)


module.exports = studentRouter;