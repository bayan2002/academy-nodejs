const { DataTypes } = require("sequelize");
const Sequelize = require("../db/config/connection");

const Time = Sequelize.define("Time", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  from: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  to: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

module.exports = Time;
