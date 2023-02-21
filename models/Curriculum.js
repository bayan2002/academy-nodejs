const { DataTypes } = require("sequelize");
const Sequelize = require("../db/config/connection");

const Curriculum = Sequelize.define("Curriculum", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  titleAr: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  titleEn: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

module.exports = Curriculum;
