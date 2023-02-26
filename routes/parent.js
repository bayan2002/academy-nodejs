const express = require("express");

const parentRouter = express.Router();
const {signUp} = require("../controllers/parent");

parentRouter.post("/signup", signUp);

module.exports = parentRouter;
