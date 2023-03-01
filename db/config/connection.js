const dotenv = require("dotenv");
const { Sequelize } = require("sequelize");

dotenv.config();
const { NODE_ENV, DATABASE_URL, DEV_DATABASE_URL } = process.env;

let url;
let ssl = false;
switch (NODE_ENV) {
  case "development":
    url = DEV_DATABASE_URL;
    break;
  case "production":
    url = DATABASE_URL;
    ssl = {
      rejectUnauthorized: false,
    };
    break;
  default:
    throw new Error("NODE_ENV is not set");
}

if (!url) throw new Error("NODE_ENV is not set");
// const sequelize = new Sequelize(url, {
//   logging: false,
//   dialect: "postgres",
//   dialectOptions: {
//     ssl,
//   },
// });
// const sequelize = new Sequelize("academy", "root", "root", {
//   logging: false,
//   dialect: "mysql",
//   dialectOptions: {
//     ssl,
//   },
// });
const sequelize = new Sequelize("rescteeh_amman_db", "rescteeh_root", "059283805928388", {
  logging: false,
  dialect: "mysql",
  dialectOptions: {
    ssl,
  },
});
module.exports = sequelize;
