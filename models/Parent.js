const { DataTypes } = require("sequelize");
const Seqalize = require("../db/config/connection");

const Parent = Seqalize.define("Parent", {
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
  },
});

module.exports = Parent;
