const express = require("express");
const rateTeacher = require("../controllers/rating");
const ratingRouter = express.Router();


ratingRouter.post("/", rateTeacher);


module.exports = ratingRouter;
