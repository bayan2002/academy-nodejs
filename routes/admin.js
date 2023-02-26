const express = require("express");

const adminRouter = express.Router();
const { login, signUp, getLevels} = require("../controllers/admin");
const logout = require("../middlewares/logout")

adminRouter.post("/signup", signUp);
adminRouter.post("/login", login);
adminRouter.post("/logout", logout);
adminRouter.get("/get", getLevels );

module.exports = adminRouter;
