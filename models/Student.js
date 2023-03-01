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
  },
  gender: {
    type: DataTypes.STRING,
  },
  image: {
    type: DataTypes.STRING,
    default: "",
  },
  city: {
    type: DataTypes.STRING,
  },
  dateOfBirth: {
    type: DataTypes.STRING,
  },
  nationality: {
    type: DataTypes.STRING,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phoneNumber: {
    type: DataTypes.STRING,
  },
  regionTime: {
    type: DataTypes.STRING,
  },
  registerCode: {
    type: DataTypes.INTEGER,
  },
  isRegistered: {
    type: DataTypes.BOOLEAN,
    default: false,
  },
});

module.exports = Student;
