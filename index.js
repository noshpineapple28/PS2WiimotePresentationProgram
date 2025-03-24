const express = require("express");
const socketIO = require("socket.io");
const http = require("http");
const app = express();
const PORT = process.env.PORT || 3000;

// servers
const server = http.createServer(app);
const io = socketIO(server);

const CONTROLLER = {
  BM1: 0xff,
  BM2: 0xff,
  RX: 0x7f,
  RY: 0x7f,
  LX: 0x7f,
  LY: 0x7f,
};

/**
 * scene states:
 *    PS2ControllerLinesScene
 *    LinesOnlyScene
 *    I2CDemo
 *    SPIDemo
 *    USARTDemo
 */
let SCENE = "LinesOnlyScene";
let is_updating = false;
const SOCKETS = {};

// whenever the "/" endpoint appears, allow server to serve all files in the site_map folder
app.use("/", express.static("site_map"));

/**
 * sets up the socket.io connection endpoints
 * all events are related to whatever the client requests
 */
io.on("connection", (socket) => {
  console.log("Connected user ", socket.id);

  /**
   * runs when the client requests to stop the server
   */
  socket.on("disconnect", () => {
    console.log("Disconnected user ", socket.id);
    delete SOCKETS[socket.id];
  });

  /**
   * tells all clients to change the current scene
   */
  socket.on("get scene", () => {
    io.emit("scene change", SCENE);
  });

  /**
   * updates the state of the controller on server side
   */
  socket.on("update controller", (cntrl) => {
    if (!cntrl || !is_updating) return;
    console.log(cntrl);

    for (let field in cntrl) CONTROLLER[field] = cntrl[field];
    socket.broadcast.emit("update controller", cntrl);
  });

  /**
   *  sets whether to have the server periodically send controller state to clients
   */
  socket.on("toggle updates", () => {
    is_updating = !is_updating;
    console.log("TOGGLE UPDATE STATE: ", is_updating);
  });

  /**
   *  gets whether the server periodically sends controller state to clients
   */
  socket.on("get server state", () => {
    io.emit("server state", is_updating);
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
