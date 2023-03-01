const express = require("express");

const adminRouter = express.Router();
const {
  login,
  signUp,
  getLevels,
  getSubjectCategories,
  getSingleSubjectCategory,
  getSubjects,
  getSingleSubject,
  getClasses,
  getSingleClass,
  getSingleLevel,
  getCurriculums,
  getSingleCurriculum,
  createSubjectCategory,
  createSubject,
  createLevel,
  createClass,
  createCurriculum,
} = require("../controllers/admin");
const checkUserAuth = require("../middlewares/checkUserAuth");
const logout = require("../middlewares/logout");
const verifyToken = require("../middlewares/verifyToken");

adminRouter.post("/signup", signUp);
adminRouter.post("/login", login);
adminRouter.post("/logout", logout);

adminRouter.post(
  "/subjectCategory",
  verifyToken,
  checkUserAuth("admin"),
  createSubjectCategory
);
adminRouter.post(
  "/subject",
  verifyToken,
  checkUserAuth("admin"),
  createSubject
);
adminRouter.post("/level", verifyToken, checkUserAuth("admin"), createLevel);
adminRouter.post("/class", verifyToken, checkUserAuth("admin"), createClass);
adminRouter.post(
  "/curriculum",
  verifyToken,
  checkUserAuth("admin"),
  createCurriculum
);

adminRouter.get("/subCategories", getSubjectCategories);
adminRouter.get("/subCategory", getSingleSubjectCategory);
adminRouter.get("/subjects", getSubjects);
adminRouter.get("/subject", getSingleSubject);
adminRouter.get("/classes", getClasses);
adminRouter.get("/class", getSingleClass);
adminRouter.get("/levels", getLevels);
adminRouter.get("/level", getSingleLevel);
adminRouter.get("/Curriculums", getCurriculums);
adminRouter.get("/Curriculums", getSingleCurriculum);

module.exports = adminRouter;
