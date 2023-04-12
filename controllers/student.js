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
  Wallet,
  Session,
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
const { Op } = require("sequelize");
const { Sequelize } = require("sequelize");

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

  if (teacher)
    throw serverErrs.BAD_REQUEST({
      arabic: "الايميل مستخدم من قبل",
      english: "email is already used",
    });
  if (student)
    throw serverErrs.BAD_REQUEST({
      arabic: "الايميل مستخدم من قبل",
      english: "email is already used",
    });
  if (parent)
    throw serverErrs.BAD_REQUEST({
      arabic: "الايميل مستخدم من قبل",
      english: "email is already used",
    });

  const code = generateRandomCode();
  const existStudent = await Student.findOne({
    where: {
      email,
      isRegistered: false,
    },
  });
  if (existStudent) await existStudent.update({ registerCode: code });
  else {
    const newStudent = await Student.create({
      email,
      name,
      location,
      registerCode: code,
    });
    await newStudent.save();
  }

  const mailOptions = {
    from: "moalemy2022@gmail.com",
    to: email,
    subject: "Moalemy platform: Your Verification Code",
    html: `<div>Welcome, <br>Thank you so much for taking time to joining us </b>
    We are happy to let you know that your account have been created.<br>
    To verify your Account enter the code please!<br>
    <b> ${code} </b>
    Good luck,<br>
    Moalemy Team
    </div> `,
  };
  sendEmail(mailOptions);

  res.send({ status: 201, msg: "successful send email" });
};

const verifyCode = async (req, res) => {
  const { registerCode, email } = req.body;

  const teacher = await Teacher.findOne({
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

  const registeredStudent = await Student.findOne({
    where: {
      email,
      isRegistered: true,
    },
  });

  if (registeredStudent)
    throw serverErrs.BAD_REQUEST({
      arabic: "الايميل مستخدم من قبل",
      english: "email is already used",
    });
  if (teacher)
    throw serverErrs.BAD_REQUEST({
      arabic: "الايميل مستخدم من قبل",
      english: "email is already used",
    });
  if (parent)
    throw serverErrs.BAD_REQUEST({
      arabic: "الايميل مستخدم من قبل",
      english: "email is already used",
    });
  const student = await Student.findOne({
    where: {
      email,
      registerCode,
    },
  });
  if (!student)
    throw serverErrs.BAD_REQUEST({
      arabic: "الكود خاطئ",
      english: "code is wrong",
    });

  await student.update({ isRegistered: true });
  res.send({
    status: 201,
    data: student,
    msg: {
      arabic: "تم التحقق من الكود بنجاح",
      english: "Verified code successfully",
    },
  });
};

const signPassword = async (req, res) => {
  const { email, password } = req.body;

  const student = await Student.findOne({
    where: {
      email,
      isRegistered: true,
    },
  });

  if (!student)
    throw serverErrs.BAD_REQUEST({
      arabic: "الايميل غير موجود",
      english: "email not found",
    });

  const hashedPassword = await hash(password, 12);

  await student.update({ password: hashedPassword });
  await student.save();

  const token = await generateToken({
    userId: student.id,
    name: student.name,
    role: "student",
  });

  const mailOptions = {
    from: "moalemy2022@gmail.com",
    to: email,
    subject: "Moalemy platform: Account Creation Successful!",
    html: `<div>Welcome, <br>Thank you so much for taking time to joining us </b>
    We are delighted to inform you that your account has been successfully created.<br>
    Congratulations on taking the first step towards experiencing our website<br><br>
    We look forward to providing you with an exceptional experience.<br>
    Good luck,<br>
    Moalemy Team
    </div> `,
  };
  sendEmail(mailOptions);
  res.send({
    status: 201,
    data: student,
    msg: {
      arabic: "تم تسجيل كلمة المرور بنجاح",
      english: "successful sign password",
    },
    token: token,
  });
};

const signData = async (req, res) => {
  const { email, gender, levelId, curriculumId, classId } = req.body;

  const student = await Student.findOne({
    where: {
      email: email,
      isRegistered: true,
    },
  });

  if (!student)
    throw serverErrs.BAD_REQUEST({
      arabic: "الايميل غير موجود",
      english: "email not found",
    });

  await student.update({
    gender,
    LevelId: levelId,
    CurriculumId: curriculumId,
    ClassId: classId,
    isRegistered: true,
  });
  await student.save();
  res.send({
    status: 201,
    data: student,
    msg: {
      arabic: "تم التسجيل البيانات بنجاح",
      english: "signed up successfully",
    },
  });
};

const getStudents = async (req, res) => {
  const Students = await Student.findAll();
  res.send({
    status: 201,
    data: Students,
    msg: {
      arabic: "تم ارجاع جميع الطلاب بنجاح",
      english: "successful get all Students",
    },
  });
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
    msg: {
      arabic: "تم ارجاع الطالب",
      english: "successful get single student",
    },
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
    msg: {
      arabic: "تم ارجاع اخر 10 طلاب مسجلين بنجاح",
      english: "successful get last ten students",
    },
  });
};

const editPersonalInformation = async (req, res) => {
  const { StudentId } = req.params;
  const student = await Student.findOne({ where: { id: StudentId } });
  if (!student)
    throw serverErrs.BAD_REQUEST({
      arabic: "الطالب غير موجود",
      english: "Student not found",
    });

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
    msg: {
      arabic: "تم تعديل بيانات الطالب بنجاح",
      english: "successful edit personal information data",
    },
  });
};

const editImageStudent = async (req, res) => {
  const { StudentId } = req.params;
  const student = await Student.findOne({ where: { id: StudentId } });
  if (!student)
    throw serverErrs.BAD_REQUEST({
      arabic: "الطالب غير موجود",
      english: "Student not found",
    });
  const clearImage = (filePath) => {
    filePath = path.join(__dirname, "..", `images/${filePath}`);
    fs.unlink(filePath, (err) => {
      if (err)
        throw serverErrs.BAD_REQUEST({
          arabic: "الصورة غير موجودة",
          english: "Image not found",
        });
    });
  };
  if (!req.file) {
    throw serverErrs.BAD_REQUEST({
      arabic: "الصورة غير موجودة",
      english: "Image not found",
    });
  }

  if (student.image) {
    clearImage(student.image);
  }
  await student.update({ image: req.file.filename });
  res.send({
    status: 201,
    student,
    msg: {
      arabic: "تم تعديل الصورة بنجاح",
      english: "successful edit student image",
    },
  });
};

const resetPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const { StudentId } = req.params;
  const student = await Student.findOne({
    where: { id: StudentId },
    include: { all: true },
  });
  if (!student)
    throw serverErrs.BAD_REQUEST({
      arabic: "الطالب غير موجود",
      english: "student not found",
    });
  const result = await compare(oldPassword, student?.password);
  if (!result)
    throw serverErrs.BAD_REQUEST({
      arabic: "كلمة المرور خاطئة",
      english: "Old password is wrong",
    });
  const hashedPassword = await hash(newPassword, 12);
  await student.update({ password: hashedPassword });
  res.send({
    status: 201,
    data: student,
    msg: {
      arabic: "تم تغيير كلمة المرور بنجاح",
      english: "successful update student password",
    },
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
  if (!teacher)
    throw serverErrs.BAD_REQUEST({
      arabic: "المعلم غير موجود",
      english: "Invalid teacherId! ",
    });

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
    msg: {
      arabic: "ارجاع بيانات الملعم بنجاح مع تحويل العملة",
      english: "successful get teacher with converted currency",
    },
  });
};

const getStudentCredit = async (req, res) => {
  const { studentId } = req.params;
  const { currency } = req.query;
  const student = await Student.findOne({
    where: { id: studentId },
    attributes: ["wallet"],
  });
  if (!student)
    throw serverErrs.BAD_REQUEST({
      arabic: "المعلم غير موجود",
      english: "Invalid studentId! ",
    });
  let currencyConverter = new CC();
  const newPrice = await currencyConverter
    .from("OMR")
    .to(currency)
    .amount(+student.wallet)
    .convert();
  student.wallet = newPrice;

  res.send({
    status: 201,
    data: student,
    msg: {
      arabic: "تم ارجاع محفظة الطالب بعملته الأصلية",
      english: "successful get student wallet",
    },
  });
};

const getWalletHistory = async (req, res) => {
  const { studentId } = req.params;
  const walletHistory = await Wallet.findAll({
    where: { studentId, isPaid: true },
  });

  res.send({
    status: 201,
    data: walletHistory,
    msg: {
      arabic: "تم ارجاع تاريخ المحفظة بنجاح",
      english: "successful get Wallet History",
    },
  });
};

const getAllLessons = async (req, res) => {
  const { studentId } = req.params;
  const lessons = await Session.findAll({
    where: { StudentId: studentId, isPaid: true },
    include: [{ model: Teacher }],
  });

  res.send({
    status: 201,
    data: lessons,
    msg: {
      arabic: "تم ارجاع جميع الجلسات بنجاح",
      english: "successful get all lessons",
    },
  });
};

const getComingLessons = async (req, res) => {
  const { studentId } = req.params;
  const comingLessons = await Session.findAll({
    where: {
      StudentId: studentId,
      isPaid: true,
      date: { [Op.gte]: new Date() },
    },
    include: [{ model: Teacher }],
  });

  res.send({
    status: 201,
    data: comingLessons,
    msg: {
      arabic: "تم ارجاع جميع الجلسات القادمة",
      english: "successful get all Coming Lessons",
    },
  });
};

const getPreviousLessons = async (req, res) => {
  const { studentId } = req.params;
  const previousLessons = await Session.findAll({
    where: {
      studentId,
      isPaid: true,
      date: { [Op.lt]: new Date() },
    },
    include: [{ model: Teacher }],
  });

  res.send({
    status: 201,
    data: previousLessons,
    msg: {
      arabic: "تم ارجاع جميع الجلسات السابقة",
      english: "successful get all Previous Lessons",
    },
  });
};

const rateTeacher = async (req, res) => {
  const { StudentId, TeacherId, rating, comment } = req.body;

  const teacher = await Teacher.findOne({
    where: {
      id: TeacherId,
    },
  });

  const session = await Session.findOne({
    where: {
      TeacherId,
      StudentId,
      isPaid: true,
    },
  });

  if (!session)
    throw serverErrs.BAD_REQUEST({
      arabic: "لا يوجد أي جلسة مع المعلم ",
      english: "You don't have any session with the teacher",
    });

  const rateData = await Rate.findOne({
    where: {
      TeacherId,
      StudentId,
    },
  });

  if (rateData)
    throw serverErrs.BAD_REQUEST({
      arabic: "لقد قمت بتقييم المعلم من قبل",
      english: "You already Rated the teacher ",
    });

  const rate = await Rate.create({
    StudentId,
    TeacherId,
    rating,
    comment,
  });

  const rates = await Rate.findAll({
    where: {
      TeacherId,
    },
    attributes: [[Sequelize.fn("AVG", Sequelize.col("rating")), "avg_rating"]],
  });

  const avgRating = rates[0].dataValues.avg_rating;
  console.log(
    "rates[0].dataValues.avg_rating: ",
    rates[0].dataValues.avg_rating
  );
  const ratingFromZeroToFive = Math.round(avgRating);

  teacher.rate = ratingFromZeroToFive;
  console.log("teacher.rate : ", teacher.rate);
  await teacher.save();

  res.send({
    status: 201,
    data: rate,
    msg: {
      arabic: "تم تقييم المعلم بنجاح",
      english: "successful rate teacher",
    },
  });
};

const getSubjectByCategoryId = async (req, res) => {
  const { id } = req.params;
  const subjects = await Subject.findAll({
    where: { SubjectCategoryId: id },
  });
  console.log(id, subjects);
  res.send({
    status: 200,
    data: subjects,
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
  getStudentCredit,
  getWalletHistory,
  getAllLessons,
  getComingLessons,
  getPreviousLessons,
  rateTeacher,
  getSubjectByCategoryId,
};
