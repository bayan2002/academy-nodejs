const { DataTypes } = require("sequelize");
const Sequelize = require("../db/config/connection");

const F2FSessionTeacher = Sequelize.define("F2FSessionTeacher", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  price: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  currency: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  discount: {
    type: DataTypes.NUMBER,
    defaultValue: 0,
  },
  priceAfterDiscount: {
    type: DataTypes.STRING,
  },
});

module.exports = F2FSessionTeacher;
