const sequelize = require("./connection");
const {
  admin,
  students,
  parents,
  teachers,
  subjectCategories,
  subjects,
  levels,
  classes,
  curriculums,
  languages,
  experiences,
  educationDegree,
  certificates,
  curriculumLevels,
  LangTeachStds
} = require("./fakeData");
const {
  Admin,
  Student,
  Parent,
  Teacher,
  SubjectCategory,
  Subject,
  Level,
  Class,
  Curriculum,
  Language,
  Experience,
  EducationDegree,
  Certificates,
  CurriculumLevel,
  LangTeachStd
} = require("../../models");

const insertDB = async () => {
  await sequelize.sync({ force: true });
  await Admin.bulkCreate(admin).then(() => console.log("Admin data have been saved"));
  await Parent.bulkCreate(parents).then(() => console.log("Parent data have been saved"));
  await Teacher.bulkCreate(teachers).then(() => console.log("Teacher data have been saved"));
  await SubjectCategory.bulkCreate(subjectCategories).then(() => console.log("subCategory data have been saved"));
  await Subject.bulkCreate(subjects).then(() => console.log("Subject data have been saved"));
  await Level.bulkCreate(levels).then(() => console.log("level data have been saved"));
  await Class.bulkCreate(classes).then(() => console.log("Class data have been saved"));
  await Curriculum.bulkCreate(curriculums).then(() => console.log("Curriculum data have been saved"));
  await CurriculumLevel.bulkCreate(curriculumLevels).then(() => console.log("CurriculumLevel data have been saved"));
  await Student.bulkCreate(students).then(() => console.log("Student data have been saved"));
  await Language.bulkCreate(languages).then(() => console.log("Language data have been saved"));
  await Experience.bulkCreate(experiences).then(() => console.log("Experience data have been saved"));
  await EducationDegree.bulkCreate(educationDegree).then(() => console.log("EducationDegree data have been saved"));
  await Certificates.bulkCreate(certificates).then(() => console.log("Certificates data have been saved"));
  await LangTeachStd.bulkCreate(LangTeachStds).then(() => console.log("LangTeachStd data have been saved"));
};
if (process.env.SEED) {
  insertDB();
}
module.exports = insertDB;
