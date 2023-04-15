const { DataTypes } = require("sequelize");
const Sequelize = require("../db/config/connection");

const Teacher = Sequelize.define("Teacher", {
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
  firstName: {
    type: DataTypes.STRING,
    defaultValue: "",
  },
  lastName: {
    type: DataTypes.STRING,
    defaultValue: "",
  },
  password: {
    type: DataTypes.STRING,
    defaultValue: "",
  },
  phone: {
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
  videoLink: {
    type: DataTypes.STRING,
    defaultValue: "",
  },
  dateOfBirth: {
    type: DataTypes.STRING,
    defaultValue: "",
  },
  city: {
    type: DataTypes.STRING,
    defaultValue: "",
  },
  country: {
    type: DataTypes.STRING,
    defaultValue: "",
  },
  haveExperience: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  experienceYears: {
    type: DataTypes.STRING,
    defaultValue: "",
  },
  favStdGender: {
    type: DataTypes.STRING,
    defaultValue: "",
  },
  haveCertificates: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  favHours: {
    type: DataTypes.STRING,
    defaultValue: "",
  },
  timeZone: {
    type: DataTypes.JSON,
    defaultValue: "",
  },
  articleExperience: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  shortHeadlineAr: {
    type: DataTypes.STRING,
    defaultValue: "",
  },
  shortHeadlineEn: {
    type: DataTypes.STRING,
    defaultValue: "",
  },
  descriptionAr: {
    type: DataTypes.TEXT,
    defaultValue: "",
  },
  descriptionEn: {
    type: DataTypes.TEXT,
    defaultValue: "",
  },
  instantBooking: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  isRegistered: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  isVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  registerCode: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  rate: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  totalAmount:{
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  dues:{
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  hoursNumbers:{
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  bookingNumbers:{
    type: DataTypes.INTEGER,
    defaultValue: 0,
  }
});

module.exports = Teacher;
