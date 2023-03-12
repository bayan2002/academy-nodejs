const { DataTypes } = require("sequelize");
const sequelize = require("../db/config/connection");

const Student = sequelize.define("Student", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    defaultValue: "",
  },
  gender: {
    type: DataTypes.STRING,
    defaultValue: "",
  },
  image: {
    type: DataTypes.STRING,
    defaultValue: "",
  },
  city: {
    type: DataTypes.STRING,
    defaultValue: "",
  },
  dateOfBirth: {
    type: DataTypes.STRING,
    defaultValue: "",
  },
  nationality: {
    type: DataTypes.STRING,
    defaultValue: "",
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phoneNumber: {
    type: DataTypes.STRING,
    defaultValue: "",
  },
  regionTime: {
    type: DataTypes.JSON,
    defaultValue: false,
  },
  registerCode: {
    type: DataTypes.INTEGER,
    defaultValue: false,
  },
  isRegistered: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = Student;
