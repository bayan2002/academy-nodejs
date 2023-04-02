const { DataTypes } = require("sequelize");
const sequelize = require("../db/config/connection");

const FinancialRecord = sequelize.define("FinancialRecord", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = FinancialRecord;
