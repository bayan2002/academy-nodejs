const { DataTypes } = require("sequelize");
const sequelize = require("../db/config/connection");

const TeacherSubjectCategory = sequelize.define("TeacherSubjectCategory", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
});

module.exports = TeacherSubjectCategory;