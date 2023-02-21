const { DataTypes } = require("sequelize");
const Sequelize = require("../db/config/connection");

const Language = Sequelize.define("Language", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Language;
