const express = require("express");
const adminRouter = require("./admin");
const teacherRouter = require("./teacher");

const router = express.Router();

router.use("/admin", adminRouter);
router.use("/teacher", teacherRouter);

module.exports = router;
