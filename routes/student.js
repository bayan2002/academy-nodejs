const express = require("express");

const studentRouter = express.Router();
const signUp = require("../controllers/student");
const logout = require("../middlewares/logout")

studentRouter.post("/signup", signUp.signUp);
studentRouter.post("/signup/code", signUp.verifyCode);
studentRouter.post("/signup/pass", signUp.signPassword);
studentRouter.post("/signup/data", signUp.signData);
studentRouter.post("/logout", logout );

module.exports = studentRouter;
