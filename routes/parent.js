const express = require("express");

const parentRouter = express.Router();
const {
  signUp,
  getSingleParent,
  addStudentToParent,
  getStudentsByParentId,
} = require("../controllers/parent");
const errorCatcher = require("../middlewares/errorCatcher");
const login = require("../middlewares/login");
// const checkUserAuth = require("../middlewares/checkUserAuth");

parentRouter.post("/signup", errorCatcher(signUp));
parentRouter.post('/login', errorCatcher(login));
parentRouter.post("/add", errorCatcher(addStudentToParent));
parentRouter.get("/get/:parentId", errorCatcher(getSingleParent));
parentRouter.get("/getStudents/:parentId", errorCatcher(getStudentsByParentId));



module.exports = parentRouter;
