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
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    default: "",
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isVerified: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  dateOfBirth: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  nationality: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  regionTime: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Student;
