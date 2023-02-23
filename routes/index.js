const express = require("express");
const adminRouter = require("./admin");
const studentRouter = require("./student");
const teacherRouter = require("./teacher");
const parentRouter = require("./parent");

const router = express.Router();

router.use("/admin", adminRouter);
router.use("/teacher", teacherRouter);
router.use('/student',studentRouter)
router.use("/parent", parentRouter);


module.exports = router;
