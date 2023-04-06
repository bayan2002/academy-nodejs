const {
  Admin,
  Class,
  Level,
  Subject,
  SubjectCategory,
  Curriculum,
  CurriculumLevel,
  ParentStudent,
  Student,
  Teacher,
  LanguageLevel,
  Session,
  Wallet,
  Parent,
} = require("../models");
const dotenv = require("dotenv");

const { validateAdminSignUp, loginValidation } = require("../validation");
const { serverErrs } = require("../middlewares/customError");
const { compare, hash } = require("bcrypt");
const generateToken = require("../middlewares/generateToken");
const { Op } = require("sequelize");
const FinancialRecord = require("../models/financialRecord");
const Notifications = require("../firebaseConfig");

const signUp = async (req, res) => {
  const { name, email, password } = req.body;
  await validateAdminSignUp.validate({ name, email, password });
  const admin = await Admin.findOne({
    where: {
      email,
    },
  });
  if (admin)
    throw serverErrs.BAD_REQUEST({
      arabic: "الإيميل مستخدم سابقا",
      english: "email is already used",
    });

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
  const token = await generateToken({ userId: id, name, role: "admin" });
  console.log(token);
  // res.cookie("token", token);

  res.send({
    status: 201,
    data: newAdmin,
    msg: { arabic: "تم التسجيل بنجاح", english: "successful sign up" },
    token: token,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  await loginValidation.validate({ email, password });

  const admin = await Admin.findOne({ where: { email } });
  if (!admin)
    throw serverErrs.BAD_REQUEST({
      arabic: "خطأ في الإيميل أو كلمة السر",
      english: "Wrong Email Or Password",
    });

  const result = await compare(password, admin.password);
  if (!result)
    throw serverErrs.BAD_REQUEST({
      arabic: "خطأ في الإيميل أو كلمة السر",
      english: "Wrong Email Or Password",
    });

  const { id, name } = admin;

  const token = await generateToken({ userId: id, name, role: "admin" });
  // res.cookie("token", token);

  res.send({
    status: 201,
    data: admin,
    msg: { arabic: "تم تسجيل الدخول بنجاح", english: "successful log in" },
    token: token,
  });
};

const createSubjectCategory = async (req, res) => {
  const image = req.file.filename;
  const { titleAR, titleEN } = req.body;
  const newSubjectCategory = await SubjectCategory.create(
    {
      titleAR,
      titleEN,
      image,
    },
    {
      returning: true,
    }
  );
  await newSubjectCategory.save();
  res.send({
    status: 201,
    data: newSubjectCategory,
    msg: {
      arabic: "تم إنشاء المادة العامة بنجاح",
      english: "successful create new SubjectCategory",
    },
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
    msg: {
      arabic: "تم إنشاء المادة الفرعية بنجاح",
      english: "successful create new Subject",
    },
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
  res.send({
    status: 201,
    data: newLevel,
    msg: {
      arabic: "تم إنشاء المستوى بنجاح",
      english: "successful create new level",
    },
  });
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
    msg: {
      arabic: "تم إنشاء الفصل بنجاح",
      english: "successful create new class",
    },
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
    msg: {
      arabic: "تم إنشاء المنهج بنجاح",
      english: "successful create new curriculum",
    },
  });
};

const linkedCurriculumLevel = async (req, res) => {
  const { levelId, curriculumId } = req.body;
  const curriculumLevel = await CurriculumLevel.findOne({
    where: {
      CurriculumId: curriculumId,
      LevelId: levelId,
    },
  });

  if (curriculumLevel)
    throw serverErrs.BAD_REQUEST({
      arabic: "تم ربط المنهج بالمستوى سابقا",
      english: "already linked curriculum with level",
    });

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
    msg: {
      arabic: "تم ربط المنهج بالمستوى بنجاح",
      english: "successful linked curriculum with level",
    },
  });
};

const getSubjects = async (req, res) => {
  const subjects = await Subject.findAll({ include: { all: true } });
  res.send({
    status: 201,
    data: subjects,
    msg: {
      arabic: "تم ارجاع جميع المواد بنجاح",
      english: "successful get all Subjects",
    },
  });
};

const getSingleSubject = async (req, res) => {
  const { subjectId } = req.params;
  const subject = await Subject.findOne({
    where: { id: subjectId },
    include: { all: true },
  });
  if (!subject)
    throw serverErrs.BAD_REQUEST({
      arabic: "المادة غير موجودة",
      english: "Invalid subjectId! ",
    });
  res.send({
    status: 201,
    data: subject,
    msg: {
      arabic: "تم ارجاع المادة بنجاح",
      english: "successful get single subject",
    },
  });
};

const getSubjectCategories = async (req, res) => {
  const subjectCategories = await SubjectCategory.findAll({
    include: { all: true },
  });
  res.send({
    status: 201,
    data: subjectCategories,
    msg: {
      arabic: "تم ارجاع المادة العامة بنجاح",
      english: "successful get all subjectCategories",
    },
  });
};

const getSingleSubjectCategory = async (req, res) => {
  const { subjectCategoryId } = req.params;
  const subjectCategory = await SubjectCategory.findOne({
    where: { id: subjectCategoryId },
    include: { all: true },
  });
  if (!subjectCategory)
    throw serverErrs.BAD_REQUEST({
      arabic: "المادة غير موجودة",
      english: "Invalid subjectCategoryId! ",
    });
  res.send({
    status: 201,
    data: subjectCategory,
    msg: {
      arabic: "تم ارجاع المادة بنجاح",
      english: "successful get single subjectCategory",
    },
  });
};

const getClasses = async (req, res) => {
  const classes = await Class.findAll({ include: Level });
  res.send({
    status: 201,
    data: classes,
    msg: {
      arabic: "تم ارجاع جميع الفصول بنجاح",
      english: "successful get all classes",
    },
  });
};

const getSingleClass = async (req, res) => {
  const { classId } = req.params;
  const singleClass = await Class.findOne({
    where: { id: classId },
    include: { all: true },
  });
  if (!singleClass)
    throw serverErrs.BAD_REQUEST({
      arabic: "الفصل غير موجود",
      english: "Invalid classId! ",
    });
  res.send({
    status: 201,
    data: singleClass,
    msg: {
      arabic: "تم ارجاع الفصل بنجاح",
      english: "successful get single singleClass",
    },
  });
};

const getLevels = async (req, res) => {
  const levels = await Level.findAll();
  res.send({
    status: 201,
    data: levels,
    msg: {
      arabic: "تم ارجاع جميع المستويات بنجاح",
      english: "successful get all levels",
    },
  });
};

const getSingleLevel = async (req, res) => {
  const { levelId } = req.params;
  const level = await Level.findOne({
    where: { id: levelId },
    include: [{ model: Class }, { model: CurriculumLevel }],
  });
  if (!level)
    throw serverErrs.BAD_REQUEST({
      arabic: "المستوى غير موجود",
      english: "Invalid levelId! ",
    });
  res.send({
    status: 201,
    data: level,
    msg: {
      arabic: "تم ارجاع المستوى بنجاح",
      english: "successful get single level",
    },
  });
};

const getCurriculums = async (req, res) => {
  const curriculums = await Curriculum.findAll({ include: CurriculumLevel });
  res.send({
    status: 201,
    data: curriculums,
    msg: {
      arabic: "تم ارجاع جميع المناهج بنجاح",
      english: "successful get all Curriculums",
    },
  });
};

const getSingleCurriculum = async (req, res) => {
  const { curriculumId } = req.params;
  const curriculum = await Curriculum.findOne({
    where: { id: curriculumId },
    include: { all: true },
  });
  if (!curriculum)
    throw serverErrs.BAD_REQUEST({
      arabic: "المنهج غير موجود",
      english: "Invalid curriculumId! ",
    });
  res.send({
    status: 201,
    data: curriculum,
    msg: {
      arabic: "تم ارجاع المنهج بنجاح",
      english: "successful get single curriculum",
    },
  });
};

const acceptStudent = async (req, res) => {
  const { ParentStudentId } = req.params;
  const parentStudent = await ParentStudent.findOne({
    where: { id: ParentStudentId },
    include: { all: true },
  });
  if (!parentStudent)
    throw serverErrs.BAD_REQUEST({
      arabic: "الأب غير موجود",
      english: "parent student not found",
    });

  await parentStudent.update({ status: 1 });
  const student = await Student.findOne({
    where: { id: parentStudent.StudentId },
    include: { all: true },
  });
  await student.update({ ParentId: parentStudent.ParentId });
  res.send({
    status: 201,
    msg: {
      arabic: "تم قبول الطالب بنجاح",
      english: "Student has been accepted",
    },
  });
};

const rejectStudent = async (req, res) => {
  const { ParentStudentId } = req.params;
  const parentStudent = await ParentStudent.findOne({
    where: { id: ParentStudentId },
    include: { all: true },
  });
  if (!parentStudent)
    throw serverErrs.BAD_REQUEST({
      arabic: "الأب غير موجود",
      english: "parent student not found",
    });

  await parentStudent.update({ status: -1 });
  res.send({
    status: 201,
    msg: {
      arabic: "تم رفض الطالب بنجاح",
      english: "Student has been rejected",
    },
  });
};

const getParentStudentWaiting = async (req, res) => {
  const parentStudents = await ParentStudent.findAll({
    where: { status: 0 },
    include: { all: true },
  });

  res.send({
    status: 201,
    data: parentStudents,
    msg: {
      arabic: "تم ارجاع جميع طلبات الأب بنجاح",
      english: "successful get all Students are waiting",
    },
  });
};

const getParentStudentAccOrRej = async (req, res) => {
  const parentStudents = await ParentStudent.findAll({
    where: { status: { [Op.or]: [1, -1] } },
    include: { all: true },
  });

  res.send({
    status: 201,
    data: parentStudents,
    msg: {
      arabic: "تم ارجاع جميع طلبات الأب المقبولة",
      english: "successful get all Students are accepted",
    },
  });
};
const acceptTeacher = async (req, res) => {
  const { teacherId } = req.params;
  const teacher = await Teacher.findOne({
    where: { id: teacherId },
  });
  if (!teacher)
    throw serverErrs.BAD_REQUEST({
      arabic: "المعلم غير موجود",
      english: "invalid teacherId!",
    });

  await teacher.update({ isVerified: true });

  res.send({
    status: 201,
    data: teacher,
    msg: {
      arabic: "تم قبول المعلم بنجاح",
      english: "teacher has been accepted",
    },
  });
};
const getAcceptedTeachers = async (req, res) => {
  const acceptedTeachers = await Teacher.findAll({
    where: { isVerified: true },
  });

  res.send({
    status: 201,
    data: acceptedTeachers,
    msg: {
      arabic: "تم ارجاع جميع المعلمين المقبولين",
      english: "successful get all acceptedTeachers",
    },
  });
};

const rejectTeacher = async (req, res) => {
  const { teacherId } = req.params;

  const teacher = await Teacher.findOne({ where: { id: teacherId } });
  if (!teacher)
    throw serverErrs.BAD_REQUEST({
      arabic: "المعلم غير موجود",
      english: "Invalid teacherId! ",
    });
  await Teacher.destroy({
    where: {
      id: teacherId,
    },
  });

  res.send({
    status: 201,
    msg: { arabic: "تم رفض المعلم", english: "Rejected teacher successfully" },
  });
};

const getWaitingTeacher = async (req, res) => {
  const teachers = await Teacher.findAll({
    where: {
      isVerified: false,
    },
  });
  res.send({
    status: 201,
    data: teachers,
    msg: {
      arabic: "تم ارجاع جميع المعلمين غير المقبولين بعد",
      english: "successful get all waiting teachers",
    },
  });
};

const getLanguageLevel = async (req, res) => {
  const languageLevels = await LanguageLevel.findAll();
  res.send({
    status: 201,
    data: languageLevels,
    msg: {
      arabic: "تم ارجاع جميع مستويات اللغة",
      english: "successful get all language level",
    },
  });
};

const updateLevel = async (req, res) => {
  const { titleAR, titleEN } = req.body;
  const { LevelId } = req.params;
  const level = await Level.findOne({
    where: { id: LevelId },
    include: { all: true },
  });
  if (!level)
    throw serverErrs.BAD_REQUEST({
      arabic: "المستوى غير موجود",
      english: "level not found",
    });
  await level.update({ titleAR, titleEN });
  res.send({
    status: 201,
    data: level,
    msg: {
      arabic: "تم تعديل المستوى بنجاح",
      english: "successful update level",
    },
  });
};

const updateSubCategories = async (req, res) => {
  const { titleAR, titleEN } = req.body;
  const { SubjectCategoryId } = req.params;
  const subjectCategory = await SubjectCategory.findOne({
    where: { id: SubjectCategoryId },
    include: { all: true },
  });
  if (!subjectCategory)
    throw serverErrs.BAD_REQUEST({
      arabic: "المادة العامة غير موجودة",
      english: "subjectCategory not found",
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
  if (req.file && subjectCategory.image) {
    clearImage(subjectCategory.image);
  }
  if (req.file) {
    await subjectCategory.update({ image: req.file.filename });
  }
  await subjectCategory.update({ titleAR, titleEN });
  res.send({
    status: 201,
    data: subjectCategory,
    msg: {
      arabic: "تم تعديل المادة العامة بنجاح",
      english: "successful update subjectCategory",
    },
  });
};

const updateSubject = async (req, res) => {
  const { titleAR, titleEN } = req.body;
  const { SubjectId } = req.params;
  const subject = await Subject.findOne({
    where: { id: SubjectId },
    include: { all: true },
  });
  if (!subject)
    throw serverErrs.BAD_REQUEST({
      arabic: "المادة غير موجودة",
      english: "Subject not found",
    });
  await subject.update({ titleAR, titleEN });
  res.send({
    status: 201,
    data: subject,
    msg: {
      arabic: "تم تعديل المادة الفرعية بنجاح",
      english: "successful update subject",
    },
  });
};

const updateClass = async (req, res) => {
  const { titleAR, titleEN } = req.body;
  const { ClassId } = req.params;
  const classes = await Class.findOne({
    where: { id: ClassId },
    include: { all: true },
  });
  if (!classes)
    throw serverErrs.BAD_REQUEST({
      arabic: "الفصل غير موجود",
      english: "Class not found",
    });
  await classes.update({ titleAR, titleEN });
  res.send({
    status: 201,
    data: classes,
    msg: { arabic: "تم تعديل الفصل بنجاح", english: "successful update Class" },
  });
};

const updateCurriculum = async (req, res) => {
  const { titleAR, titleEN } = req.body;
  const { CurriculumId } = req.params;
  const curriculum = await Curriculum.findOne({
    where: { id: CurriculumId },
    include: { all: true },
  });
  if (!curriculum)
    throw serverErrs.BAD_REQUEST({
      arabic: "المنهج غير موجود",
      english: "Curriculum not found",
    });
  await curriculum.update({ titleAR, titleEN });
  res.send({
    status: 201,
    data: curriculum,
    msg: {
      arabic: "تم تعديل المنهج بنجاح",
      english: "successful update curriculum",
    },
  });
};

const payDues = async (req, res) => {
  const { price, TeacherId } = req.body;

  await FinancialRecord.create({
    amount: price,
    type: "paid",
    TeacherId,
  });

  const teacher = await Teacher.findOne({
    where: {
      id: TeacherId,
    },
  });

  teacher.dues += +price;
  await teacher.save();

  await Notifications.add({ 
    titleAR: "تم دفع المستحقات  ", 
    titleEn:"successfully paying dues ",
    TeacherId,
    seen: false
   });

  res.send({
    status: 201,
    data: teacher,
    msg: "successful paid to teacher",
  });
};

const getAllSessions = async (req, res) => {
  const lessons = await Session.findAll({
    where: {
      isPaid: true,
    },
    include: [{ model: Student }, { model: Teacher }],
  });

  res.send({
    status: 201,
    data: lessons,
    msg: "successful get all lessons",
  });
};

const getAllWallets = async (req, res) => {
  const wallets = await Wallet.findAll({
    where: {
      isPaid: true,
      typeEn: "deposit",
    },
    include: [{ model: Student }],
  });

  res.send({
    status: 201,
    data: wallets,
    msg: "successful get all wallets",
  });
};

const getStudentWallets = async (req, res) => {
  const { StudentId } = req.params;

  const wallets = await Wallet.findAll({
    where: {
      StudentId,
      isPaid: true,
    },
  });
  res.send({
    status: 201,
    data: wallets,
    msg: "successful get all student wallets",
  });
};

const getThawaniSession = async (req, res) => {
  const { StudentId } = req.params;

  const sessions = await Session.findAll({
    where: {
      StudentId,
      typeOfPayment: "thawani",
      isPaid: true,
    },
  });

  res.send({
    status: 201,
    data: sessions,
    msg: "successful get all thawani session",
  });
};

const getAllTeachers = async (req, res) => {
  const teachers = await Teacher.findAll({
    where: {
      isVerified: true,
      isRegistered: true,
    },
  });

  res.send({
    status: 201,
    data: teachers,
    msg: "successful get all teachers",
  });
};

const getTeacherFinancial = async (req, res) => {
  const { TeacherId } = req.params;

  const records = await FinancialRecord.findAll({
    where: {
      TeacherId,
    },
  });

  res.send({
    status: 201,
    data: records,
    msg: "successful get all financial records for teacher",
  });
};

const getNumbers = async(req,res) => {
  
const studentsNumber = await Student.count({
  where: {
    isRegistered: true
  }
});

const teachersNumber = await Teacher.count({
  where: {
    isRegistered: true,
    isVerified: true
  }
});

const parentsNumber = await Parent.count();

const sessionsNumber = await Session.count({
  where: {
    isPaid: true
  }
});

res.send({
  status: 201,
  data: {studentsNumber, teachersNumber, parentsNumber, sessionsNumber},
  msg: "successful get all numbers",
});

}

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
  acceptStudent,
  rejectStudent,
  getParentStudentWaiting,
  getParentStudentAccOrRej,
  acceptTeacher,
  getAcceptedTeachers,
  rejectTeacher,
  getWaitingTeacher,
  getLanguageLevel,
  updateLevel,
  updateSubCategories,
  updateSubject,
  updateClass,
  updateCurriculum,
  payDues,
  getAllSessions,
  getAllWallets,
  getStudentWallets,
  getThawaniSession,
  getAllTeachers,
  getTeacherFinancial,
  getNumbers
};
