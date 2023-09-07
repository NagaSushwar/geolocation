const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log("A client connected.");

  socket.on("sendLocationUpdate", (data) => {
    io.emit("locationUpdate", data);
  });

  socket.on("disconnect", () => {
    console.log("A client disconnected.");
  });
});

server.listen(3000, () => {
  console.log("WebSocket server listening on port 3000");
});
