const express = require("express");

const adminRouter = express.Router();
const { login, signUp, getLevels, getSubjectCategories, getSingleSubjectCategory, getSubjects, getSingleSubject, getClasses,
  getSingleClass, getSingleLevel, getCurriculums, getSingleCurriculum  } = require("../controllers/admin");
const logout = require("../middlewares/logout")

adminRouter.post("/signup", signUp);
adminRouter.post("/login", login);
adminRouter.post("/logout", logout);
adminRouter.get("/get", getLevels );
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
