const express = require("express");

const studentRouter = express.Router();
const {signUp, verifyCode, signPassword, signData} = require("../controllers/student");

studentRouter.post("/signup", signUp);
studentRouter.post("/signup/code", verifyCode);
studentRouter.post("/signup/pass", signPassword);
studentRouter.post("/signup/data", signData);

module.exports = studentRouter;
