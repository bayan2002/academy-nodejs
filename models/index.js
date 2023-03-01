const Admin = require("./Admin");
const Student = require("./Student");
const Parent = require("./Parent");
const Level = require("./Level");
const Wallet = require("./Wallet");
const Class = require("./Class");
const Subject = require("./Subject");
const SubjectCategory = require("./SubjectCategory");
const TeacherSubjectCategory = require("./TeacherSubjectCategory");
const Message = require("./Message");
const Conversation = require("./Conversation");
const Days = require("./Days");
const TeacherDay = require("./TeacherDay");
const ParentStudent = require("./ParentStudent");
const EducationDegree = require("./EducationDegree");
const Teacher = require("./Teacher");
const Experience = require("./Experience");
const Time = require("./Time");
const RemoteSession = require("./RemoteSession");
const F2FSessionStd = require("./F2FSessionStd");
const F2FSessionTeacher = require("./F2FSessionTeacher");
const Language = require("./Language");
const LangTeachStd = require("./LangTeachStd");
const Session = require("./Session");
const TeacherLevel = require("./TeacherLevel");
const CurriculumTeacher = require("./CurriculumTeacher");
const Curriculum = require("./Curriculum");
const CurriculumLevel = require("./CurriculumLevel");
const Certificates = require("./Certificates");

Teacher.hasMany(LangTeachStd);
LangTeachStd.belongsTo(Teacher);
Language.hasMany(LangTeachStd);
LangTeachStd.belongsTo(Language);
Student.hasMany(LangTeachStd);
LangTeachStd.belongsTo(Student);
Teacher.hasMany(Experience);
Experience.belongsTo(Teacher);
Teacher.hasMany(Session);
Session.belongsTo(Teacher);
Student.hasMany(Session);
Session.belongsTo(Student);
Teacher.hasMany(EducationDegree);
EducationDegree.belongsTo(Teacher);
Teacher.hasMany(Certificates);
Certificates.belongsTo(Teacher);
Teacher.hasMany(TeacherDay);
TeacherDay.belongsTo(Teacher);
Days.hasMany(TeacherDay);
TeacherDay.belongsTo(Days);
Time.hasMany(TeacherDay);
TeacherDay.belongsTo(Time);
Teacher.hasMany(Conversation);
Conversation.belongsTo(Teacher);
Student.hasMany(Conversation);
Conversation.belongsTo(Student);
Conversation.hasMany(Message);
Message.belongsTo(Conversation);
Teacher.hasMany(F2FSessionStd);
F2FSessionStd.belongsTo(Teacher);
Teacher.hasMany(RemoteSession);
RemoteSession.belongsTo(Teacher);
Teacher.hasMany(F2FSessionTeacher);
F2FSessionTeacher.belongsTo(Teacher);
Parent.hasMany(ParentStudent);
ParentStudent.belongsTo(Parent);
Student.hasMany(ParentStudent);
ParentStudent.belongsTo(Student);
Curriculum.hasMany(CurriculumLevel);
CurriculumLevel.belongsTo(Curriculum);
Level.hasMany(CurriculumLevel);
CurriculumLevel.belongsTo(Level);
Level.hasMany(Class);
Class.belongsTo(Level);
Level.hasMany(Student);
Student.belongsTo(Level);
Class.hasMany(Student);
Student.belongsTo(Class);
Level.hasMany(TeacherLevel);
TeacherLevel.belongsTo(Level);
Teacher.hasMany(TeacherLevel);
TeacherLevel.belongsTo(Teacher);
Curriculum.hasMany(CurriculumTeacher);
CurriculumTeacher.belongsTo(Curriculum);
Teacher.hasMany(CurriculumTeacher);
CurriculumTeacher.belongsTo(Teacher);
Curriculum.hasMany(Student);
Student.belongsTo(Curriculum);
SubjectCategory.hasMany(Subject);
Subject.belongsTo(SubjectCategory);
SubjectCategory.hasMany(TeacherSubjectCategory);
TeacherSubjectCategory.belongsTo(SubjectCategory);
Teacher.hasMany(TeacherSubjectCategory);
TeacherSubjectCategory.belongsTo(Teacher);
Teacher.hasOne(Wallet);
Wallet.belongsTo(Teacher);
Student.belongsTo(Parent);
Parent.hasMany(Student);

module.exports = {
  Admin,
  Student,
  Parent,
  Level,
  Wallet,
  Class,
  Subject,
  SubjectCategory,
  TeacherSubjectCategory,
  Message,
  Conversation,
  Days,
  TeacherDay,
  ParentStudent,
  EducationDegree,
  Teacher,
  Experience,
  Time,
  RemoteSession,
  F2FSessionStd,
  F2FSessionTeacher,
  Language,
  LangTeachStd,
  Session,
  TeacherLevel,
  Curriculum,
  Certificates,
  CurriculumLevel,
  CurriculumTeacher,
};
