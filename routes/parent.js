const express = require("express");

const parentRouter = express.Router();
const {
  signUp,
  getSingleParent,
  addStudentToParent,
  getStudentsByParentId,
} = require("../controllers/parent");
const errorCatcher = require("../middlewares/errorCatcher");

parentRouter.post("/signup", errorCatcher(signUp));
parentRouter.post("/get/:parentId", errorCatcher(getSingleParent));
parentRouter.post("/add", errorCatcher(addStudentToParent));
parentRouter.post("/getStudents/:parentId", errorCatcher(getStudentsByParentId));



module.exports = parentRouter;
