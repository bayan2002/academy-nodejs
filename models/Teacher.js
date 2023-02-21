const { DataTypes } = require("sequelize");
const Seqalize = require("../db/config/connection");

const Teacher = Sequelize.define('Teacher', {
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
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  phone: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
  },
  videoLink: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dateOfBirth: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  experience: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  experienceYears: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  favStdGender: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  certificates: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  favHours: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  shortHeadlineAr: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  shortHeadlineEn: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descriptionAr: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  descriptionEn: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  instantBooking: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  isRegistered: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  isVerified: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  }

})

module.exports = Teacher;