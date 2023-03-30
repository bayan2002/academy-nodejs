const { DataTypes } = require("sequelize");
const sequelize = require("../db/config/connection");

const Wallet = sequelize.define("Wallet", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  price: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  typeAr: {
    type: DataTypes.STRING,
    defaultValue: false,
  },
  typeEn: {
    type: DataTypes.STRING,
    defaultValue: false,
  },
  isPaid: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  sessionId: {
    type: DataTypes.STRING,
    defaultValue: "",
  },
  currency: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Wallet;
