const express = require("express");
const cookieParser = require("cookie-parser");
const compression = require("compression");
const morgan = require("morgan");
const router = require("./routes");
const dotenv = require("dotenv");
const { clientError, serverError } = require("./middlewares/error");

dotenv.config();
const app = express();

app.set("port", process.env.PORT || 3500);

app.use([
  express.json(),
  cookieParser(),
  compression(),
  express.urlencoded({ extended: false }),
]);
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use("/api/v1", router);

app.use(clientError);
app.use(serverError);

module.exports = app;
