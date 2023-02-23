const express = require("express");
const studentRouter = require("./student");
const teacherRouter = require("./teacher");

const router = express.Router();

router.use('/teacher',teacherRouter)
router.use('/student',studentRouter)


module.exports = router;