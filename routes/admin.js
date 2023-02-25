const express = require("express");

const adminRouter = express.Router();
const admin = require("../controllers/admin");

adminRouter.post("/signup", admin.signUp);
adminRouter.post("/login", admin.login);

module.exports = adminRouter;
