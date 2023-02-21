const { DataTypes } = require("sequelize");
const Sequelize = require("../db/config/connection");

const LangTeachStd = Sequelize.define("LangTeachStd", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  level: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = LangTeachStd;
