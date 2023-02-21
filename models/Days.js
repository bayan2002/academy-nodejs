const { DataTypes } = require("sequelize");
const sequelize = require("../db/config/connection");

const Days = sequelize.define("Days", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
});

module.exports = Days;