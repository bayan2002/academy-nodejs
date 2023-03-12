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
  acceptStudent,
  rejectStudent,
  getParentStudentWaiting,
  getParentStudentAccOrRej,
  acceptTeacher,
  getAcceptedTeachers,
  rejectTeacher,
  getWaitingTeacher,
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
adminRouter.post(
  "/level",
  verifyToken,
  checkUserAuth("admin"),
  errorCatcher(createLevel)
);
adminRouter.post(
  "/class",
  verifyToken,
  checkUserAuth("admin"),
  errorCatcher(createClass)
);
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

adminRouter.post(
  "/studentParent/accept/:ParentStudentId",
  verifyToken,
  checkUserAuth("admin"),
  errorCatcher(acceptStudent)
);

adminRouter.post(
  "/studentParent/reject/:ParentStudentId",
  verifyToken,
  checkUserAuth("admin"),
  errorCatcher(rejectStudent)
);

adminRouter.post(
  "/reject/:teacherId",
  verifyToken,
  checkUserAuth("admin"),
  errorCatcher(rejectTeacher)
);

adminRouter.get("/subCategories", getSubjectCategories);
adminRouter.get(
  "/subCategory/:subjectCategoryId",
  errorCatcher(getSingleSubjectCategory)
);
adminRouter.get("/subjects", getSubjects);
adminRouter.get("/subject/:subjectId", errorCatcher(getSingleSubject));
adminRouter.get("/classes", getClasses);
adminRouter.get("/class/:classId", errorCatcher(getSingleClass));
adminRouter.get("/levels", getLevels);
adminRouter.get("/level/:levelId", errorCatcher(getSingleLevel));
adminRouter.get("/Curriculums", getCurriculums);
adminRouter.get("/Curriculum/:curriculumId", errorCatcher(getSingleCurriculum));

adminRouter.get(
  "/getStudentsWaiting",
  verifyToken,
  checkUserAuth("admin"),
  errorCatcher(getParentStudentWaiting)
);
adminRouter.get(
  "/getStudentsAccOrRej",
  verifyToken,
  checkUserAuth("admin"),
  errorCatcher(getParentStudentAccOrRej)
);

adminRouter.post(
  "/accept/:teacherId",
  verifyToken,
  checkUserAuth("admin"),
  errorCatcher(acceptTeacher)
);
adminRouter.get(
  "/acceptedTeachers",
  verifyToken,
  checkUserAuth("admin"),
  errorCatcher(getAcceptedTeachers)
);
adminRouter.get(
  "/waitingTeachers",
  verifyToken,
  checkUserAuth("admin"),
  errorCatcher(getWaitingTeacher)
);

module.exports = adminRouter;
