const express = require("express");

const parentRouter = express.Router();
const {
  signUp,
  getSingleParent,
  addStudentToParent,
  getStudentsByParentId,
} = require("../controllers/parent");

parentRouter.post("/signup", signUp);
parentRouter.post("/get/:parentId", getSingleParent);
parentRouter.post("/add", addStudentToParent);
parentRouter.post("/getStudents/:parentId", getStudentsByParentId);

module.exports = parentRouter;
