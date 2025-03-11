const express = require("express");
const socketIO = require("socket.io");
const http = require("http");
const app = express();
const PORT = 3000;

// servers
const server = http.createServer(app);
const io = socketIO(server);

// whenever the "/" endpoint appears, allow server to serve all files in the site_map folder
app.use("/", express.static("site_map"));

/**
 * sets up the socket.io connection endpoints
 * all events are related to whatever the client requests
 */
io.on("connection", (socket) => {
  console.log("Connected");

  /**
   * runs when the client requests to stop the server
   * @param data the name of the server we wish to stop
   */
  socket.on("disconnect", (data) => {
    console.log("Disconnected user");
  });
});

// startup
server.listen(PORT);
