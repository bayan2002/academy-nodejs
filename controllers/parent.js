const { Parent, Teacher, Student, ParentStudent } = require("../models");
const { validateParentSignUp, loginValidation } = require("../validation");
const { serverErrs } = require("../middlewares/customError");
const { compare, hash } = require("bcrypt");
const generateToken = require("../middlewares/generateToken");

const signUp = async (req, res) => {
  const { name, email, password } = req.body;
  await validateParentSignUp.validate({ name, email, password });
  const parent = await Parent.findOne({
    where: {
      email,
    },
  });

  const teacher = await Teacher.findOne({
    where: {
      email,
      isRegistered: true,
    },
  });

  const student = await Student.findOne({
    where: {
      email,
    },
  });
  if (parent) throw serverErrs.BAD_REQUEST("email is already used");
  if (teacher) throw serverErrs.BAD_REQUEST("email is already used");
  if (student) throw serverErrs.BAD_REQUEST("email is already used");

  const hashedPassword = await hash(password, 12);

  const newParent = await Parent.create(
    {
      name,
      email,
      password: hashedPassword,
    },
    {
      returning: true,
    }
  );
  await newParent.save();
  const { id } = newParent;
  const token = await generateToken({ userId: id, name, role: "parent" });

  res.cookie("token", token);

  res.send({ status: 201, data: newParent, msg: "successful sign up" });
};

const getSingleParent = async (req, res) => {
  const { parentId } = req.params;
  const parent = await Parent.findOne({
    where: { id: parentId },
    include: { all: true },
  });
  res.send({
    status: 201,
    data: parent,
    msg: "successful get single parent",
  });
};

const addStudentToParent = async (req, res) => {
  const { parentId, studentId } = req.body;
  const parent = await Parent.findOne({
    where: { id: parentId },
    include: { all: true },
  });
  const student = await Student.findOne({
    where: { id: studentId },
    include: { all: true },
  });
  if (!parent) throw serverErrs.BAD_REQUEST("parent not exist");
  if (!student) throw serverErrs.BAD_REQUEST("student not exist");
  if (student.parentId)
    throw serverErrs.BAD_REQUEST("student already have a parent");

  const oldParentStudent = await ParentStudent.findOne({
    where: { ParentId: parentId, StudentId:studentId },
    include: { all: true },
  });
  if (
    oldParentStudent &&
    (oldParentStudent.status === 0 || oldParentStudent.status === 1)
  )
    throw serverErrs.BAD_REQUEST("student request is already exist");

  const newParentStudent = await ParentStudent.create({
    ParentId: parentId, StudentId:studentId
  });
  await newParentStudent.save();

  res.send({
    status: 201,
    data: newParentStudent,
    msg: "successful added student to parent waiting list",
  });
};

const getStudentsByParentId = async (req, res) => {
  const { parentId } = req.params;
  const students = await Student.findAll({
    where: { ParentId: parentId },
    include: { all: true },
  });

  res.send({
    status: 201,
    data: students,
    msg: "successful get all Students for single Parent",
  });
};

module.exports = {
  signUp,
  getSingleParent,
  addStudentToParent,
  getStudentsByParentId,
};
