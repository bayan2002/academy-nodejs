const {
  Admin,
  Class,
  Level,
  Subject,
  SubjectCategory,
  Curriculum,
  CurriculumLevel,
} = require("../models");

const { validateAdminSignUp, loginValidation } = require("../validation");
const { serverErrs } = require("../middlewares/customError");
const { compare, hash } = require("bcrypt");
const generateToken = require("../middlewares/generateToken");

const signUp = async (req, res) => {
  const { name, email, password } = req.body;
  await validateAdminSignUp.validate({ name, email, password });
  const admin = await Admin.findOne({
    where: {
      email,
    },
  });
  if (admin) throw serverErrs.BAD_REQUEST("email is already used");

  const hashedPassword = await hash(password, 12);

  const newAdmin = await Admin.create(
    {
      name,
      email,
      password: hashedPassword,
    },
    {
      returning: true,
    }
  );
  await newAdmin.save();
  const { id } = newAdmin;
  const token = await generateToken({ userId: id, name, role: "admin"});
console.log(token);
  res.cookie("token", token);

  res.send({ status: 201, data: newAdmin, msg: "successful sign up" });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  await loginValidation.validate({ email, password });

  const admin = await Admin.findOne({ where: { email } });
  if (!admin) throw serverErrs.BAD_REQUEST("Wrong Email Or Password");

  const result = await compare(password, admin.password);
  if (!result) throw serverErrs.BAD_REQUEST("Wrong Email Or Password");

  const { id, name } = admin;

  const token = await generateToken({ userId: id, name, role: "admin" });
  res.cookie("token", token);

  res.send({ status: 201, data: admin, msg: "successful log in" });
};

const createSubjectCategory = async (req, res) => {
  // const image = req.file.fileName
  const { titleAR, titleEN } = req.body;
  const newSubjectCategory = await SubjectCategory.create(
    {
      titleAR,
      titleEN,
      // image
    },
    {
      returning: true,
    }
  );
  await newSubjectCategory.save();
  res.send({
    status: 201,
    data: newSubjectCategory,
    msg: "successful create new SubjectCategory",
  });
};

const createSubject = async (req, res) => {
  const { titleAR, titleEN, subjectCategoryId } = req.body;
  const newSubject = await Subject.create(
    {
      titleAR,
      titleEN,
      SubjectCategoryId: subjectCategoryId,
    },
    {
      returning: true,
    }
  );
  await newSubject.save();
  res.send({
    status: 201,
    data: newSubject,
    msg: "successful create new Subject",
  });
};

const createLevel = async (req, res) => {
  const { titleAR, titleEN } = req.body;
  const newLevel = await Level.create(
    {
      titleAR,
      titleEN,
    },
    {
      returning: true,
    }
  );
  await newLevel.save();
  res.send({ status: 201, data: newLevel, msg: "successful create new level" });
};

const createClass = async (req, res) => {
  const { titleAR, titleEN, levelId } = req.body;
  const newClassCreated = await Class.create(
    {
      titleAR,
      titleEN,
      LevelId: levelId,
    },
    {
      returning: true,
    }
  );
  await newClassCreated.save();
  res.send({
    status: 201,
    data: newClassCreated,
    msg: "successful create new class",
  });
};

const createCurriculum = async (req, res) => {
  const { titleAR, titleEN } = req.body;
  const newCurriculum = await Curriculum.create(
    {
      titleAR,
      titleEN,
    },
    {
      returning: true,
    }
  );
  await newCurriculum.save();
  res.send({
    status: 201,
    data: newCurriculum,
    msg: "successful create new curriculum",
  });
};

const linkedCurriculumLevel = async(req, res) => {
  const {levelId, curriculumId} = req.body
  const curriculumLevel = await CurriculumLevel.findOne({
    where: {
      CurriculumId: curriculumId,
      LevelId: levelId,
    }
  })

  if(curriculumLevel) throw serverErrs.BAD_REQUEST("already linked curriculum with level");

  const newCurriculumLevel = await CurriculumLevel.create(
    {
      CurriculumId: curriculumId,
      LevelId: levelId,
    },
    {
      returning: true,
    }
  );
  await newCurriculumLevel.save();
  res.send({
    status: 201,
    data: newCurriculumLevel,
    msg: "successful linked curriculum with level",
  });
}
const getSubjects = async (req, res) => {
  const subjects = await Subject.findAll();
  res.send({ status: 201, data: subjects, msg: "successful get all Subjects" });
};

const getSingleSubject = async (req, res) => {
  const { subjectId } = req.params;
  const subject = await Subject.findOne({
    where: { id: subjectId },
    include: { all: true },
  });
  res.send({
    status: 201,
    data: subject,
    msg: "successful get single subject",
  });
};

const getSubjectCategories = async (req, res) => {
  const subjectCategories = await SubjectCategory.findAll();
  res.send({
    status: 201,
    data: subjectCategories,
    msg: "successful get all subjectCategories",
  });
};

const getSingleSubjectCategory = async (req, res) => {
  const { subjectCategoryId } = req.params;
  const subjectCategory = await SubjectCategory.findOne({
    where: { id: subjectCategoryId },
    include: { all: true },
  });
  res.send({
    status: 201,
    data: subjectCategory,
    msg: "successful get single subjectCategory",
  });
};

const getClasses = async (req, res) => {
  const classes = await Class.findAll();
  res.send({ status: 201, data: classes, msg: "successful get all classes" });
};

const getSingleClass = async (req, res) => {
  const { classId } = req.params;
  const singleClass = await Class.findOne({
    where: { id: classId },
    include: { all: true },
  });
  res.send({
    status: 201,
    data: singleClass,
    msg: "successful get single singleClass",
  });
};

const getLevels = async (req, res) => {
  const levels = await Level.findAll();
  res.send({ status: 201, data: levels, msg: "successful get all levels" });
};

const getSingleLevel = async (req, res) => {
  const { levelId } = req.params;
  const level = await Level.findOne({
    where: { id: levelId },
    include: { all: true },
  });
  res.send({
    status: 201,
    data: level,
    msg: "successful get single level",
  });
};

const getCurriculums = async (req, res) => {
  const curriculums = await Curriculum.findAll();
  res.send({
    status: 201,
    data: curriculums,
    msg: "successful get all Curriculums",
  });
};

const getSingleCurriculum = async (req, res) => {
  const { curriculumId } = req.params;
  const curriculum = await Curriculum.findOne({
    where: { id: curriculumId },
    include: { all: true },
  });
  res.send({
    status: 201,
    data: curriculum,
    msg: "successful get single curriculum",
  });
};

module.exports = {
  signUp,
  login,
  createSubjectCategory,
  createSubject,
  createLevel,
  createClass,
  createCurriculum,
  getSubjects,
  getSingleSubject,
  getSubjectCategories,
  getSingleSubjectCategory,
  getClasses,
  getSingleClass,
  getLevels,
  getSingleLevel,
  getCurriculums,
  getSingleCurriculum,
  linkedCurriculumLevel,
};
