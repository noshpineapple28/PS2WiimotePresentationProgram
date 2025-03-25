"use strict";
const MEDIA = {};
let SOCKET;
let controller;

let scene;

function preload() {
  MEDIA["controller"] = loadImage("../media/controller.png");
  MEDIA["square"] = loadImage("../media/square.png");
  MEDIA["circle"] = loadImage("../media/circle.png");
  MEDIA["x"] = loadImage("../media/x.png");
  MEDIA["triangle"] = loadImage("../media/triangle.png");
  MEDIA["dpad"] = loadImage("../media/dpad.png");
  MEDIA["analog"] = loadImage("../media/analog.png");
  MEDIA["start"] = loadImage("../media/start.png");
  MEDIA["select"] = loadImage("../media/select.png");
  MEDIA["1trigger"] = loadImage("../media/1trigger.png");
  MEDIA["2trigger"] = loadImage("../media/2trigger.png");
  MEDIA["stick_button"] = loadImage("../media/stick_button.png");
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);

  // initialize the socket
  SOCKET = io();
  /*************** IO EVENTS ***************/
  /**
   * handle the changing of scenes
   * @param e the name of the scene to change to
   */
  SOCKET.on("scene change", (e) => {
    switch (e) {
      case "PS2ControllerLinesScene": {
        if (scene instanceof PS2ControllerLinesScene) break;
        scene = new PS2ControllerLinesScene();
        break;
      }
      case "LinesOnlyScene": {
        if (scene instanceof LinesOnlyScene) break;
        scene = new LinesOnlyScene();
        break;
      }
      case "I2CDemo": {
        if (scene instanceof I2CDemo) break;
        scene = new I2CDemo();
        break;
      }
      case "SPIDemo": {
        if (scene instanceof SPIDemo) break;
        scene = new SPIDemo();
        break;
      }
      case "USARTDemo": {
        if (scene instanceof USARTDemo) break;
        scene = new USARTDemo();
        break;
      }
    }
  });

  /**
   * gets a controller to send status to server
   */
  SOCKET.on("get controller", () => {
    // if it doesn't exist, don't send
    if (!scene || !scene.controller) {
      SOCKET.emit("update controller", undefined);
      return;
    }

    SOCKET.emit("update controller", scene.controller.get_controller());
  });

  /**
   * updates the state of a controller
   * @param cntrl the controller to update with
   */
  SOCKET.on("update controller", (cntrl) => {
    // if it doesn't exist, don't update
    if (!scene || !scene.controller) return;

    scene.controller.set_controller(cntrl);
  });
  SOCKET.emit("get scene");

  // set frame rate
  frameRate(60);
}

function draw() {
  background(87);

  // only render if the scene has been set
  if (!scene) return;

  scene.update();
  scene.display();
}

// temp for sending clock start
function mousePressed() {
  // only handle if the scene has been set
  if (!scene) return;

  scene.mouseClicked();

  // if it doesn't exist, don't send
  if (!scene || !scene.controller) {
    SOCKET.emit("update controller", undefined);
    return;
  }

  SOCKET.emit("update controller", scene.controller.get_controller());
}

function mouseReleased() {
  // only handle if the scene has been set
  if (!scene) return;

  scene.mouseClicked();

  // if it doesn't exist, don't send
  if (!scene || !scene.controller) {
    SOCKET.emit("update controller", undefined);
    return;
  }

  SOCKET.emit("update controller", scene.controller.get_controller());
}

function mouseDragged() {
  // only handle if the scene has been set
  if (!scene) return;

  // to save our bandwidth only send it on frames divisible by 20
  if (frameCount % 3 == 0) return;
  // if it doesn't exist, don't send
  if (!scene || !scene.controller) {
    SOCKET.emit("update controller", undefined);
    return;
  }
  if (
    scene.controller.left_stick.is_inside() ||
    scene.controller.right_stick.is_inside()
  ) {
    scene.mouseClicked();
    SOCKET.emit("update controller", scene.controller.get_controller());
  }
}

function touchStarted() {
  // only handle if the scene has been set
  if (!scene) return;

  scene.touchStarted();

  // if it doesn't exist, don't send
  if (!scene || !scene.controller) {
    SOCKET.emit("update controller", undefined);
    return;
  }

  SOCKET.emit("update controller", scene.controller.get_controller());
}
