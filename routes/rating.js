const express = require("express");
const {rateTeacher, getTeacherRate} = require("../controllers/rating");
const ratingRouter = express.Router();


ratingRouter.post("/", rateTeacher);
ratingRouter.get("/teacherRate", getTeacherRate);


module.exports = ratingRouter;
