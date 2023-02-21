const { DataTypes } = require("sequelize");
const sequelize = require("../db/config/connection");

const Message = sequelize.define("Message", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  senderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Message;
