const { Parent, Teacher, Student, ParentStudent } = require("../models");
const { validateParentSignUp } = require("../validation");
const { serverErrs } = require("../middlewares/customError");
const { compare, hash } = require("bcrypt");
const generateToken = require("../middlewares/generateToken");
const { Op } = require("sequelize");

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

  // res.cookie("token", token);

  res.send({
    status: 201,
    data: newParent,
    msg: "successful sign up",
    token: token,
  });
};

const getSingleParent = async (req, res) => {
  const { ParentId } = req.params;
  const parent = await Parent.findOne({
    where: { id: ParentId },
    include: { all: true },
  });
  res.send({
    status: 201,
    data: parent,
    msg: "successful get single parent",
  });
};

const addStudentToParent = async (req, res) => {
  const { ParentId, StudentId } = req.body;
  console.log(ParentId, StudentId);
  const parent = await Parent.findOne({
    where: { id: ParentId },
    include: { all: true },
  });
  const student = await Student.findOne({
    where: { id: StudentId },
    include: { all: true },
  });

  if (!parent) throw serverErrs.BAD_REQUEST("parent not exist");
  if (!student) throw serverErrs.BAD_REQUEST("student not exist");
  if (student.ParentId)
    throw serverErrs.BAD_REQUEST("student already have a parent");

  const oldParentStudent = await ParentStudent.findOne({
    where: { ParentId, StudentId, status: { [Op.ne]: -1 } },
    include: { all: true },
  });

  if (oldParentStudent)
    throw serverErrs.BAD_REQUEST("student request is already exist");

  const newParentStudent = await ParentStudent.create({
    ParentId,
    StudentId,
  });
  await newParentStudent.save();

  res.send({
    status: 201,
    data: newParentStudent,
    msg: "successful added student to parent waiting list",
  });
};

const getStudentsByParentId = async (req, res) => {
  const { ParentId } = req.params;
  const students = await Student.findAll({
    where: { ParentId },
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
