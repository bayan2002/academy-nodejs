const express = require("express");

const studentRouter = express.Router();
const signUp = require("../controllers/student");

studentRouter.post("/signup", signUp.signUp);
studentRouter.post("/signup/code", signUp.verifyCode);
studentRouter.post("/signup/pass", signUp.signPassword);
studentRouter.post("/signup/data", signUp.signData);

module.exports = studentRouter;
