"use strict";
// const SOCKET = io();
const WIRES = [];
const MEDIA = {};
let controller;
// controls the hz for the entire program
let hz = 5;
let transaction_in_progress = false;

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
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);

  // set frame rate
  frameRate(60);

  // positioning of elements
  let wire_y_start = height * 0.01;
  let wire_y_spacing = height * 0.11;
  let wire_width = width / 2;
  let wire_height = height * 0.08;
  // for a mobile format, change the positioning of elements
  if (window.innerWidth < window.innerHeight) {
    wire_y_start = (height / 2) * 0.01;
    wire_y_spacing = (height / 2) * 0.11;
    wire_width = width;
    wire_height = (height / 2) * 0.08;
    // set PS2 to be on the bottom of the screen
    controller = new PS2(width / 2, height * 0.75, width, height / 2);
  } else {
    // set PS2 to be on the right side of the screen otherwise
    controller = new PS2(width * 0.75, height / 2, width / 2, height);
  }

  // set alert pin
  const ALERT = new Alert(
    0,
    wire_y_start + wire_y_spacing * 3,
    wire_width,
    wire_height,
    "yellow"
  );
  // add pins to WIRES array
  WIRES.push(
    new Ack(0, wire_y_start, wire_width, wire_height, color(0, 255, 0))
  );
  WIRES.push(
    new Unk(
      0,
      wire_y_start + wire_y_spacing,
      wire_width,
      wire_height,
      color(255, 255, 255)
    )
  );
  WIRES.push(
    new Clock(
      0,
      wire_y_start + wire_y_spacing * 2,
      wire_width,
      wire_height,
      "blue",
      ALERT
    )
  );
  WIRES.push(ALERT);
  WIRES.push(
    new Voltage(
      0,
      wire_y_start + wire_y_spacing * 4,
      wire_width,
      wire_height,
      color(255, 0, 0)
    )
  );
  WIRES.push(
    new Ground(
      0,
      wire_y_start + wire_y_spacing * 5,
      wire_width,
      wire_height,
      color(0, 0, 0)
    )
  );
  WIRES.push(
    new Vibration(
      0,
      wire_y_start + wire_y_spacing * 6,
      wire_width,
      wire_height,
      "gray"
    )
  );
  WIRES.push(
    new MOSI(
      0,
      wire_y_start + wire_y_spacing * 7,
      wire_width,
      wire_height,
      "orange",
      WIRES[2],
      ALERT
    )
  );
  WIRES.push(
    new MISO(
      0,
      wire_y_start + wire_y_spacing * 8,
      wire_width,
      wire_height,
      "brown",
      WIRES[2],
      ALERT,
      WIRES[0]
    )
  );
}

function draw() {
  background(87);
  for (const WIRE of WIRES) {
    WIRE.update();
    WIRE.display();
  }

  controller.display();
}

// handle the button updates
function handleButtonPresses() {
  for (let button of controller.buttons) {
    if (button.is_inside()) button.pressed = !button.pressed;
  }
}

// temp for sending clock start
function mouseClicked() {
  WIRES[8].initiate_transfer();
  WIRES[8].byte = 0;
  WIRES[7].initiate_transfer();
  WIRES[7].byte = 0;
  if (mouseIsPressed) handleButtonPresses();

  console.log(
    abs(mouseX - controller.posX) / controller.width,
    abs(mouseY - controller.posY) / controller.width
  );
}

function touchStarted() {
  WIRES[8].initiate_transfer();
  WIRES[8].byte = 0;
  WIRES[7].initiate_transfer();
  WIRES[7].byte = 0;
  handleButtonPresses();
}
