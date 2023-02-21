const { DataTypes } = require("sequelize");
const Seqalize = require("../db/config/connection");

const Parent = Seqalize.define("Parent", {
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
