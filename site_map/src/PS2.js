/**
 * The PS2 controller allows users to alter the state of the data being
 *    sent, as well as the Hz at which the display updates
 */

class PS2 {
  /**
   * constructs the PS2 controller
   * @param {int} posX x pos
   * @param {int} posY y pos
   * @param {int} width width of PS2 container
   * @param {int} height height of PS2 container
   */
  constructor(posX, posY, width, height) {
    this.posX = posX;
    this.posY = posY;
    this.width = width;
    this.height = height;

    // slider pos
    this.knob_x = this.posX;
    this.knob_x = map(
      1,
      0.25,
      5,
      this.posX - this.width * 0.1,
      this.posX + this.width * 0.1
    );
    this.knob_y = this.posY - this.height * 0.25;
  }

  /**
   * @brief draws the Hz changer slider
   */
  slider() {
    stroke(0);
    line(
      this.posX - this.width * 0.1,
      this.knob_y,
      this.posX + this.width * 0.1,
      this.knob_y
    );

    // knob
    if (
      mouseIsPressed &&
      mouseX >= this.posX - this.width * 0.1 &&
      mouseX <= this.posX + this.width * 0.1 &&
      mouseY >= this.knob_y - this.width * 0.025 &&
      mouseY <= this.knob_y + this.width * 0.025
    ) {
      this.knob_x = mouseX;
    }
    ellipse(this.knob_x, this.knob_y, this.width * 0.025, this.width * 0.025);
    // set hertz
    hz = map(
      this.knob_x,
      this.posX - this.width * 0.1,
      this.posX + this.width * 0.1,
      0.25,
      5
    );

    // display hz
    noStroke();
    text(
      `Displaying at ${round(hz, 2)} Hz`,
      this.posX,
      this.knob_y + this.height * 0.05
    );
  }

  /**
   * displays the PS2 controller
   */
  display() {
    this.slider();
    textAlign(CENTER, CENTER);
    noStroke();
    fill(0);
    text("TEMP, PS2 CONTROLLER\nWILL GO HERE", this.posX, this.posY);
  }
}
