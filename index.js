const express = require("express");
const socketIO = require("socket.io");
const http = require("http");
const app = express();
const PORT = process.env.PORT || 3000;

// servers
const server = http.createServer(app);
const io = socketIO(server);

/**
 * scene states:
 *    PS2ControllerLinesScene
 *    LinesOnlyScene
 *    I2CDemo
 *    SPIDemo
 *    USARTDemo
 */
let SCENE = "LinesOnlyScene";

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
   */
  socket.on("disconnect", () => {
    console.log("Disconnected user");
  });

  /**
   * tells all clients to change the current scene
   */
  socket.on("get scene", () => {
    io.emit("scene change", SCENE);
  });

  /**
   * tells all clients to change the current scene
   * @param e the name of the server we wish to start
   */
  socket.on("scene change", (e) => {
    SCENE = e;
    console.log(`SCENE CHANGED TO: ${SCENE}`);
    io.emit("scene change", SCENE);
  });
});

// startup
console.log(`Started on port ${PORT}`);
server.listen(PORT);
