const { DataTypes } = require("sequelize");
const sequelize = require("../db/config/connection");

const Parent = sequelize.define("Parent", {
  email: {
    type: DataTypes.STRING,
    required: true,
  },
  password: {
    type: DataTypes.STRING,
    required: true,
  },
  name: {
    type: DataTypes.STRING,
    required: true,
  },
  image: {
    type: DataTypes.STRING,
    default: "",
  },
});

module.exports = Parent;
