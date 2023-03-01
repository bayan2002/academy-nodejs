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
  certificates
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
  Certificates
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
  // await Curriculum.bulkCreate(curriculums);
  // await Student.bulkCreate(students).then(() => console.log("student data have been saved"));
  // await Language.bulkCreate(languages);
  // await Experience.bulkCreate(experiences);
  // await EducationDegree.bulkCreate(educationDegree);
  // await Certificates.bulkCreate(certificates);
};
if (process.env.SEED) {
  insertDB();
}
module.exports = insertDB;
