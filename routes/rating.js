const express = require("express");
const {rateTeacher, getTeacherRate} = require("../controllers/rating");
const errorCatcher = require("../middlewares/errorCatcher");
const ratingRouter = express.Router();


ratingRouter.post("/", errorCatcher(rateTeacher));
ratingRouter.get("/teacherRate", errorCatcher(getTeacherRate));


module.exports = ratingRouter;
