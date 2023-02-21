const { DataTypes } = require("sequelize");
const sequelize = require("../db/config/connection");

const TeacherDay = sequelize.define("TeacherDay", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
});

module.exports = TeacherDay;