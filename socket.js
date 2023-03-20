const Server = require("socket.io");
const app = require("./app");
const { createServer } = require("http");

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const users = {};
try {
  io.on("connection", (socket) => {
    socket.on("newUser", (userId) => {
      users[`${userId}`] = socket.id;
    });

    socket.on("sendTextMessage", (data) => {
      const { receiverId, senderId, message } = data;
      const socketId = users[receiverId];
      if (socketId) {
        socket.to(socketId).emit("sendMessage", {
          senderId,
          message,
        });
      }
    });

    socket.on("disconnect", () => {
      delete users[`${userId}`];
    });
  });
} catch (error) {
  console.log(error);
}
export default server;
