/**
 * this is designed to be a parent class, representing
 *    a generic wire. handles all display and update
 *    mechanics as well
 */

class Wire {
  /**
   * constructs the base of a Wire
   * @param {int} posX
   * @param {int} posY
   * @param {int} width
   * @param {int} height
   * @param {p5.color} color color of the wire
   */
  constructor(posX, posY, width, height, color) {
    this.posX = posX;
    this.posY = posY;
    this.width = width;
    this.height = height;
    this.color = color;

    // states
    this.edge = "RISING";

    // positions
    this.points = [[this.posX, this.posY]];
  }

  /**
   * updates the position of logic lines
   */
  update() {
    // update points
    for (let i = 0; i < this.points.length; i++) {
      if (this.points[i][0] < this.width + this.posX) this.points[i][0] += 1;
    }
    // remove points at the end of an array
    if (
      this.points[0] &&
      this.points[1] &&
      this.points[0][0] == this.points[1][0]
    )
      this.points.shift();
  }

  /**
   * prints out min and max lines for every wire
   */
  print_traces() {
    stroke(0, 0, 0, 50);
    // width of the dotted line
    let line_width = (this.width + this.posX * 2) * 0.05;
    // draw the lines
    for (let i = this.posX; i <= this.posX + this.width; i += line_width) {
      // top
      line(this.posX + i, this.posY, this.posX + i - line_width / 2, this.posY);
      // bottom
      line(
        this.posX + i,
        this.posY + this.height,
        this.posX + i - line_width / 2,
        this.posY + this.height
      );
    }
    stroke(0, 0, 0, 255);
  }

  /**
   * displays the wire currently being rendered
   */
  display() {
    strokeWeight(1);
    // print traces
    this.print_traces();

    // print signal
    stroke(this.color);
    for (let i = 0; i < this.points.length; i++) {
      if (i == this.points.length - 1) {
        line(
          this.points[i][0],
          this.points[i][1],
          this.posX,
          this.points[i][1]
        );
        continue;
      }

      line(
        this.points[i][0],
        this.points[i][1],
        this.points[i + 1][0],
        this.points[i][1]
      );
      line(
        this.points[i + 1][0],
        this.points[i + 1][1],
        this.points[i + 1][0],
        this.points[i][1]
      );
    }
  }
}
