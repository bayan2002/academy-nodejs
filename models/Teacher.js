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
  },
  lastName: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
  },
  phone: {
    type: DataTypes.STRING,
  },
  gender: {
    type: DataTypes.STRING,
  },
  image: {
    type: DataTypes.STRING,
  },
  videoLink: {
    type: DataTypes.STRING,
  },
  dateOfBirth: {
    type: DataTypes.STRING,
  },
  city: {
    type: DataTypes.STRING,
  },
  country: {
    type: DataTypes.STRING,
  },
  haveExperience: {
    type: DataTypes.BOOLEAN,
  },
  experienceYears: {
    type: DataTypes.STRING,
  },
  favStdGender: {
    type: DataTypes.STRING,
  },
  haveCertificates: {
    type: DataTypes.BOOLEAN,
  },
  favHours: {
    type: DataTypes.STRING,
  },
  timeZone: {
    type: DataTypes.JSON,
  },
  articleExperience: {
    type: DataTypes.BOOLEAN,
  },
  shortHeadlineAr: {
    type: DataTypes.STRING,
  },
  shortHeadlineEn: {
    type: DataTypes.STRING,
  },
  descriptionAr: {
    type: DataTypes.TEXT,
  },
  descriptionEn: {
    type: DataTypes.TEXT,
  },
  instantBooking: {
    type: DataTypes.BOOLEAN,
  },
  isRegistered: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  isVerified: {
    type: DataTypes.BOOLEAN,
  },
  registerCode: {
    type: DataTypes.INTEGER,
  },
});

module.exports = Teacher;
