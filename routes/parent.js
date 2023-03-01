const express = require("express");

const parentRouter = express.Router();
const {signUp} = require("../controllers/parent");
const errorCatcher = require("../middlewares/errorCatcher");

parentRouter.post("/signup", errorCatcher(signUp));

module.exports = parentRouter;
