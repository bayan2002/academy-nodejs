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
  await Admin.bulkCreate(admin);
  await Student.bulkCreate(students);
  await Parent.bulkCreate(parents);
  await Teacher.bulkCreate(teachers);
  await SubjectCategory.bulkCreate(subjectCategories);
  await Subject.bulkCreate(subjects);
  await Level.bulkCreate(levels);
  await Class.bulkCreate(classes);
  await Curriculum.bulkCreate(curriculums);
  await Language.bulkCreate(languages);
  await Experience.bulkCreate(experiences);
  await EducationDegree.bulkCreate(educationDegree);
  await Certificates.bulkCreate(certificates);
};
if (process.env.SEED) {
  insertDB();
}
module.exports = insertDB;
