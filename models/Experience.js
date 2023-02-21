const { DataTypes } = require("sequelize");
const Seqalize = require("../db/config/connection");

const Experirnce = Sequelize.define("Experience", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  }, 
  jobTitle: {
    type: DataTypes.STRING,
    allowNull: false
  },
  companyName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  from: {
    type: DataTypes.DATE,
    allowNull: false
  },
  to:{
    type: DataTypes.DATE,
    allowNull: false
  }
})

module.exports = Experience;