const { Teacher, Student, Parent } = require("../models");
const { validateTeacher, loginValidation } = require("../validation");
const { serverErrs } = require("../middlewares/customError");
const generateRandomCode = require("../middlewares/generateCode");
const sendEmail = require("../middlewares/sendEmail");
const { compare, hash } = require("bcrypt");
const generateToken = require("../middlewares/generateToken");

const signUp = async (req, res) => {
  const { email } = req.body;
  await validateTeacher.validate({ email });

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

  const parent = await Parent.findOne({
    where: {
      email,
    },
  });

  if (teacher) throw serverErrs.BAD_REQUEST("email is already used");
  if (student) throw serverErrs.BAD_REQUEST("email is already used");
  if (parent) throw serverErrs.BAD_REQUEST("email is already used");

  const code = generateRandomCode();
  const newTeacher = await Teacher.create({
    email,
    registerCode: code,
  });
  await newTeacher.save();

  sendEmail(email, code);
  res.send({ status: 201, data: teacher, msg: "successful send email" });
};

const verifyCode = async (req, res) => {
  const { registerCode, email } = req.body;

  const teacher = await Teacher.findOne({
    where: {
      email,
    },
  });

  const student = await Student.findOne({
    where: {
      email,
    },
  });

  const parent = await Parent.findOne({
    where: {
      email,
    },
  });

  if (!teacher) throw serverErrs.BAD_REQUEST("email not found");
  if (teacher.isRegistered)
    throw serverErrs.BAD_REQUEST("email is already used");
  if (student) throw serverErrs.BAD_REQUEST("email is already used");
  if (parent) throw serverErrs.BAD_REQUEST("email is already used");
  console.log('teacher.registerCode != registerCode: ', teacher.registerCode != registerCode);
  console.log('sterCode: ', registerCode);
  console.log('teacher.registerCode: ', teacher.registerCode);

  if (teacher.registerCode != registerCode) {
    throw serverErrs.BAD_REQUEST("code is wrong");
  }

  await teacher.update({ isRegistered: true });
  res.send({ status: 201, data: teacher, msg: "Verified code successfully" });
};

const signPassword = async (req, res) => {
  const { email, password } = req.body;

  const teacher = await Teacher.findOne({
    where: {
      email,
    },
  });

  const student = await Student.findOne({
    where: {
      email,
    },
  });

  const parent = await Parent.findOne({
    where: {
      email,
    },
  });

  if (!teacher) throw serverErrs.BAD_REQUEST("email not found");
  if (teacher.isRegister) throw serverErrs.BAD_REQUEST("email is already used");
  if (student) throw serverErrs.BAD_REQUEST("email is already used");
  if (parent) throw serverErrs.BAD_REQUEST("email is already used");

  const hashedPassword = await hash(password, 12);

  await teacher.update({ password: hashedPassword });
  await teacher.save();

  const token = await generateToken({ userId: teacher.id });

  res.cookie("token", token);
  res.send({ status: 201, data: teacher, msg: "successful sign up" });
};


module.exports = { signUp, verifyCode, signPassword };
