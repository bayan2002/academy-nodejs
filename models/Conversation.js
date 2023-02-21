const { DataTypes } = require("sequelize");
const sequelize = require("../db/config/connection");

const Conversation = sequelize.define("Conversation", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
});

module.exports = Conversation;