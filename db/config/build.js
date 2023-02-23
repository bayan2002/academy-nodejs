const sequelize = require("./connection");
const {
  admin,
  students,
  parents,
  teachers,
  subjectCategories,
  subjects,
  levels,
} = require("./fakeData");
const {
  Admin,
  Student,
  Parent,
  Teacher,
  SubjectCategory,
  Subject,
  Level,
} = require("../../models");

const insertDB = async () => {
  await sequelize.sync({ force: true });
  // await Admin.bulkCreate(admin);
  // await Student.bulkCreate(students);
  // await Parent.bulkCreate(parents);
  // await Teacher.bulkCreate(teachers);
  // await SubjectCategory.bulkCreate(subjectCategories);
  // await Subject.bulkCreate(subjects);
  // await Level.bulkCreate(levels);
};
if (process.env.SEED) {
  insertDB();
}
module.exports = insertDB;
