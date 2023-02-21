const { DataTypes } = require("sequelize");
const sequelize = require("../db/config/connection");

const EducationDegree = sequelize.define("EducationDegree", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  UniversityName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  from: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  to: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  degree: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = EducationDegree;