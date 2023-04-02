const {
  Teacher,
  Student,
  Parent,
  LangTeachStd,
  RemoteSession,
  F2FSessionStd,
  F2FSessionTeacher,
  Level,
  Curriculum,
  Class,
  Experience,
  EducationDegree,
  Certificates,
  TeacherDay,
  TeacherLevel,
  CurriculumTeacher,
  Days,
  Language,
  Subject,
} = require("../models");
const { validateStudent, loginValidation } = require("../validation");
const { serverErrs } = require("../middlewares/customError");
const generateRandomCode = require("../middlewares/generateCode");
const sendEmail = require("../middlewares/sendEmail");
const { compare, hash } = require("bcrypt");
const generateToken = require("../middlewares/generateToken");
const path = require("path");
const fs = require("fs");
const CC = require("currency-converter-lt");
const TeacherSubject = require("../models/TeacherSubject");
const Rate = require("../models/Rate");

const signUp = async (req, res) => {
  const { email, name, location } = req.body;
  await validateStudent.validate({ email, name, location });

  const teacher = await Teacher.findOne({
    where: {
      email,
      isRegistered: true,
    },
  });

  const student = await Student.findOne({
    where: {
      email,
      isRegistered: true,
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
  const newStudent = await Student.create({
    email,
    name,
    location,
    registerCode: code,
  });
  await newStudent.save();

  sendEmail(email, code);
  res.send({ status: 201, msg: "successful send email" });
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
      registerCode
    },
  });

  const parent = await Parent.findOne({
    where: {
      email,
    },
  });

  if (!student) throw serverErrs.BAD_REQUEST("email not found");
  if (student.isRegistered)
    throw serverErrs.BAD_REQUEST("email is already used");
  if (teacher) throw serverErrs.BAD_REQUEST("email is already used");
  if (parent) throw serverErrs.BAD_REQUEST("email is already used");
  if (student.registerCode != registerCode) {
    throw serverErrs.BAD_REQUEST("code is wrong");
  }

  res.send({ status: 201, data: student, msg: "Verified code successfully" });
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

  if (!student) throw serverErrs.BAD_REQUEST("email not found");
  if (student.isRegister) throw serverErrs.BAD_REQUEST("email is already used");
  if (teacher) throw serverErrs.BAD_REQUEST("email is already used");
  if (parent) throw serverErrs.BAD_REQUEST("email is already used");

  const hashedPassword = await hash(password, 12);

  await student.update({ password: hashedPassword });
  await student.save();

  const token = await generateToken({
    userId: student.id,
    name: student.name,
    role: "student",
  });

  // res.cookie("token", token);
  res.send({
    status: 201,
    data: student,
    msg: "successful sign password",
    token: token,
  });
};

const signData = async (req, res) => {
  const { email, gender, levelId, curriculumId, classId } = req.body;

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

  if (!student) throw serverErrs.BAD_REQUEST("email not found");
  if (student.isRegister) throw serverErrs.BAD_REQUEST("email is already used");
  if (teacher) throw serverErrs.BAD_REQUEST("email is already used");
  if (parent) throw serverErrs.BAD_REQUEST("email is already used");

  await student.update({
    gender,
    LevelId: levelId,
    CurriculumId: curriculumId,
    ClassId: classId,
    isRegistered: true,
  });
  await student.save();
  res.send({ status: 201, data: student, msg: "signed up successfully" });
};

const getStudents = async (req, res) => {
  const Students = await Student.findAll();
  res.send({ status: 201, data: Students, msg: "successful get all Students" });
};

const getSingleStudent = async (req, res) => {
  const { studentId } = req.params;
  const student = await Student.findOne({
    where: { id: studentId },
    include: [
      { model: Level },
      { model: Curriculum },
      { model: Class },
      { model: LangTeachStd },
    ],
  });
  res.send({
    status: 201,
    data: student,
    msg: "successful get single student",
  });
};

const getLastTenStudent = async (req, res) => {
  const students = await Student.findAll({
    where: { isRegistered: 1 },
    limit: 10,
    order: [["id", "DESC"]],
    include: { all: true },
  });
  res.send({
    status: 201,
    data: students,
    msg: "successful get last ten students",
  });
};

const editPersonalInformation = async (req, res) => {
  const { StudentId } = req.params;
  const student = await Student.findOne({ where: { id: StudentId } });
  if (!student) throw serverErrs.BAD_REQUEST("Student not found");

  const {
    name,
    gender,
    dateOfBirth,
    phoneNumber,
    city,
    nationality,
    location,
    regionTime,
    languages,
    LevelId,
    ClassId,
    CurriculumId,
  } = req.body;

  await student.update({
    name,
    gender,
    dateOfBirth,
    phoneNumber,
    city,
    nationality,
    location,
    regionTime,
    LevelId,
    ClassId,
    CurriculumId,
  });

  await LangTeachStd.destroy({
    where: {
      StudentId: student.id,
    },
  });

  await LangTeachStd.bulkCreate(languages).then(() =>
    console.log("LangTeachStd data have been created")
  );

  res.send({
    status: 201,
    msg: "successful edit personal information data",
  });
};

const editImageStudent = async (req, res) => {
  const { StudentId } = req.params;
  const student = await Student.findOne({ where: { id: StudentId } });
  if (!student) throw serverErrs.BAD_REQUEST("Student not found");
  const clearImage = (filePath) => {
    filePath = path.join(__dirname, "..", `images/${filePath}`);
    fs.unlink(filePath, (err) => {
      if (err) throw serverErrs.BAD_REQUEST("Image not found");
    });
  };
  if (!req.file) {
    throw serverErrs.BAD_REQUEST("Image not found");
  }

  if (student.image) {
    clearImage(student.image);
  }
  await student.update({ image: req.file.filename });
  res.send({
    status: 201,
    student,
    msg: "successful edit student image",
  });
};

const resetPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const { StudentId } = req.params;
  const student = await Student.findOne({
    where: { id: StudentId },
    include: { all: true },
  });
  if (!student) throw serverErrs.BAD_REQUEST("student not found");
  const result = await compare(oldPassword, student?.password);
  if (!result) throw serverErrs.BAD_REQUEST("Old password is wrong");
  const hashedPassword = await hash(newPassword, 12);
  await student.update({ password: hashedPassword });
  res.send({
    status: 201,
    data: student,
    msg: "successful update student password",
  });
};

const getSingleTeacher = async (req, res) => {
  const { teacherId } = req.params;
  const { currency } = req.query;
  const teacher = await Teacher.findOne({
    where: { id: teacherId },
    include: [
      { model: RemoteSession },
      { model: F2FSessionStd },
      { model: F2FSessionTeacher },
      { model: LangTeachStd, include: [Language] },
      { model: Experience },
      { model: EducationDegree },
      { model: Certificates },
      { model: TeacherDay, include: [Days] },
      { model: TeacherLevel, include: [Level] },
      { model: CurriculumTeacher, include: [Curriculum] },
      { model: TeacherSubject, include: [Subject] },
      { model: Rate, include: [Student] },
    ],
  });
  if (!teacher) throw serverErrs.BAD_REQUEST("Invalid teacherId! ");

  let currencyConverter = new CC();

  if (teacher.RemoteSession) {
    const newPriceRemote = await currencyConverter
      .from(teacher.RemoteSession.currency)
      .to(currency)
      .amount(+teacher.RemoteSession.price)
      .convert();
    teacher.RemoteSession.price = newPriceRemote;
  }
  if (teacher.F2FSessionStd) {
    const newPriceF2FStudent = await currencyConverter
      .from(teacher.F2FSessionStd.currency)
      .to(currency)
      .amount(+teacher.F2FSessionStd.price)
      .convert();
    teacher.F2FSessionStd.price = newPriceF2FStudent;
  }
  if (teacher.F2FSessionTeacher) {
    const newPriceF2FTeacher = await currencyConverter
      .from(teacher.F2FSessionTeacher.currency)
      .to(currency)
      .amount(+teacher.F2FSessionTeacher.price)
      .convert();
    teacher.F2FSessionTeacher.price = newPriceF2FTeacher;
  }

  res.send({
    status: 201,
    data: teacher,
    msg: "successful convert price",
  });
};

module.exports = {
  signUp,
  verifyCode,
  signPassword,
  signData,
  getStudents,
  getSingleStudent,
  getLastTenStudent,
  editPersonalInformation,
  editImageStudent,
  resetPassword,
  getSingleTeacher,
};
