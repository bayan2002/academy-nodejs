const express = require("express");

const parentRouter = express.Router();
const parent = require("../controllers/parent");
const logout = require("../middlewares/logout")

parentRouter.post("/signup", parent.signUp);
parentRouter.post("/login", parent.login);
parentRouter.post("/logout", logout);

module.exports = parentRouter;
