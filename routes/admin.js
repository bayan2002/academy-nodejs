const express = require("express");

const adminRouter = express.Router();
const { login, signUp, getLevels} = require("../controllers/admin");
const logout = require("../middlewares/logout")

adminRouter.post("/signup", signUp);
adminRouter.post("/login", login);
adminRouter.post("/logout", logout);
adminRouter.get("/get", getLevels );



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
