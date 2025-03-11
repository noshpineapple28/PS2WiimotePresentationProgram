const SOCKET = io();

let other_circle = [0, 0];

function setup() {
  createCanvas(200, 200);
  setInterval(
    () =>
      SOCKET.emit("pos", {
        pos: [mouseX, mouseY],
      }),
    10
  );
}

function draw() {
  background(0);
  circle(other_circle[0], other_circle[1], 10);
  circle(mouseX, mouseY, 10);
}

SOCKET.on("pos", pos => {
    other_circle[0] = pos.pos[0];
    other_circle[1] = pos.pos[1];
})
