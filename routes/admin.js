const express = require("express");

const adminRouter = express.Router();
const admin = require("../controllers/admin");
const logout = require("../middlewares/logout")

adminRouter.post("/signup", admin.signUp);
adminRouter.post("/login", admin.login);
adminRouter.post("/logout", logout);

module.exports = adminRouter;
