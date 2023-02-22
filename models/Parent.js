const { DataTypes } = require("sequelize");
const sequelize = require("../db/config/connection");

const Parent = sequelize.define("Parent", {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    default: "",
  },
});

module.exports = Parent;
