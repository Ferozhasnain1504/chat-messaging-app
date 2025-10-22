import express from "express";
import { Server } from "socket.io"; // socket server
import http from "http";
import { ENV } from "./env.js";
import { socketAuthMiddleware } from "../middleware/socket.auth.middleware.js";

const app = express();

const server = http.createServer(app);

// create a socket server
const io = new Server(server, {
  cors: {
    origin: ENV.CLIENT_URL,
    credentials: true, // send cookies from client
  },
});

// apply authentication middleware to app socket connections
io.use(socketAuthMiddleware);

// this is for storing online users
const userSocketMap = {}; // {userId : socketId}

io.on("connection", (socket) => {
  console.log("A User connected", socket.user.fullName);

  const userId = socket.userId;
  userSocketMap[userId] = socket.id;

  // io.emit() is used to send events to all connected clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.user.fullName);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export {io, app, server}
