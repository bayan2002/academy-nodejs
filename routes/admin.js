const express = require("express");

const adminRouter = express.Router();
const admin = require("../controllers/admin");
const logout = require("../middlewares/logout")

adminRouter.post("/signup", admin.signUp);
adminRouter.post("/login", admin.login);
adminRouter.post("/logout", logout);



adminRouter.get("/subCategories", admin.getSubjectCategories);
adminRouter.get("/subCategoriy", admin.getSingleSubjectCategory);
adminRouter.get("/subjects", admin.getSubjects);
adminRouter.get("/subject", admin.getSingleSubject);
adminRouter.get("/classes", admin.getClasses);
adminRouter.get("/class", admin.getSingleClass);
adminRouter.get("/levels", admin.getLevels);
adminRouter.get("/level", admin.getSinglelevel);
adminRouter.get("/Curriculums", admin.getCurriculums);
adminRouter.get("/Curriculums", admin.getSingleCurriculum);

module.exports = adminRouter;
