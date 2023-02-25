const express = require("express");

const parentRouter = express.Router();
const parent = require("../controllers/parent");

parentRouter.post("/signup", parent.signUp);
parentRouter.post("/login", parent.login);

module.exports = parentRouter;
