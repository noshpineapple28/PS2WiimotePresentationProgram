"use strict";
const SOCKET = io();
const MEDIA = {};
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

  // set frame rate
  frameRate(60);

  scene = new PS2ControllerLinesScene();
}

function draw() {
  background(87);
  scene.update();
  scene.display();
}

// temp for sending clock start
function mouseClicked() {
  scene.mouseClicked();
}

function touchStarted() {
  scene.touchStarted();
}
