const app = require("./app");

const sequelize = require("./db/config/connection");

const port = app.get("port");

const server = require("./socket");

sequelize
  // .sync()
  .sync({ force: true })
  .then(() => {
    server.listen(port, () => {
      console.log(`The Server is running on http://localhost:${port}`);
    });
  })
  .catch(() => console.log("Error on synchronizing db"));
