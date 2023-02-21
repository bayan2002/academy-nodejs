const { DataTypes } = require("sequelize");
const sequelize = require("../db/config/connection");

const Wallet = sequelize.define("Wallet", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  money: {
    type: DataTypes.INTEGER,
    default: 0,
  },
  status: {
    type: DataTypes.BOOLEAN,
    default: false,
  },
});

module.exports = Wallet;