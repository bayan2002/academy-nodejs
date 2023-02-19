const sequelize = require("./connection");

import { Admin, Student } from "../../models/index";

const insertDB = async () => {
  await sequelize.sync({ force: true });
};
if (process.env.SEED) {
  insertDB();
}
module.exports = insertDB;
