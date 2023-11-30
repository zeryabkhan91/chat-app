const { Server } = require("socket.io");
const config = require("config");
const casual = require("casual");

class Socket {
  constructor() {
    this.io;
  }

  static initialize(server) {

    this.io = new Server(server, {
      cors: {
        origin: config.frontendUrl,
        methods: ["GET", "POST"],
        transports: ['websocket', 'polling'],
        credentials: true
      },
      allowEIO3: true,
      connectionStateRecovery: {}
    });

    this.io.use((socket, next) => {
      if (socket.handshake.query.userName)
        socket.userName = casual.name;
      next();
    });

    this.io.on("connection", (socket) => {

      socket.on("prepareUserDetail", () => {
        this.io.to(socket.id).emit('userDetail', socket.userName)
      });

      socket.on("newUser", (userId) => {
        addNewUser(userId, socket.id);
      });

      socket.on("send-notification", (data) => {
        this.io.emit("getNotification", data);
      });

      socket.on("disconnect", () => {
        removeUser(socket.id);
      });
    });
  }
}

let onlineUsers = [];

const addNewUser = (userId, socketId) => {
  !onlineUsers.some((user) => user.userId === userId) &&
    onlineUsers.push({ userId, socketId });
};

const removeUser = (socketId) => {
  onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return onlineUsers.find((user) => user.userId === userId);
};

module.exports = Socket;
