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
  linkedCurriculumLevel,
} = require("../controllers/admin");
const checkUserAuth = require("../middlewares/checkUserAuth");
const logout = require("../middlewares/logout");
const verifyToken = require("../middlewares/verifyToken");
const errorCatcher = require("../middlewares/errorCatcher");

adminRouter.post("/signup", errorCatcher(signUp));
adminRouter.post("/login", errorCatcher(login));
adminRouter.post("/logout", logout);

adminRouter.post(
  "/subjectCategory",
  verifyToken,
  checkUserAuth("admin"),
  errorCatcher(createSubjectCategory)
);
adminRouter.post(
  "/subject",
  verifyToken,
  checkUserAuth("admin"),
 errorCatcher(createSubject)
);
adminRouter.post("/level", verifyToken, checkUserAuth("admin"), errorCatcher(createLevel));
adminRouter.post("/class", verifyToken, checkUserAuth("admin"), errorCatcher(createClass));
adminRouter.post(
  "/curriculum",
  verifyToken,
  checkUserAuth("admin"),
  errorCatcher(createCurriculum)
);
adminRouter.post(
  "/curriculumLevel",
  verifyToken,
  checkUserAuth("admin"),
  errorCatcher(linkedCurriculumLevel)
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
