const express = require("express");
const adminRouter = require("./admin");
const studentRouter = require("./student");
const teacherRouter = require("./teacher");
const parentRouter = require("./parent");
const LanguageRouter = require("./language");
const login = require("../middlewares/login");
const logout = require("../middlewares/logout");
const errorCatcher = require("../middlewares/errorCatcher");

const router = express.Router();

router.use("/admin", adminRouter);
router.use("/teacher", teacherRouter);
router.use('/student',studentRouter)
router.use("/parent", parentRouter);
router.use("/language", LanguageRouter);
router.post('/login', errorCatcher(login));
router.get('/logout', logout)


module.exports = router;
