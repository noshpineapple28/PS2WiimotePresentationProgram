/**
 * custome Wire implementation for a SPI SS line
 */

class Alert extends Wire {
  /**
   * constructs the alert line
   * @param {int} posX
   * @param {int} posY
   * @param {int} width
   * @param {int} height
   * @param {p5.color} color the color of the wire
   */
  constructor(posX, posY, width, height, color) {
    super(posX, posY, width, height, color);

    // holds how many frames to subtract by for animating
    this.start_frame_remainder = 0;

    // states
    this.transfering = false;
  }

  /**
   * when alerted, will toggle the state of the line to invert
   * @param {int} start_frame_remainder how many frames to offset the tick animation
   */
  alert(start_frame_remainder) {
    this.transfering = !this.transfering;
    if (this.transfering) {
      this.edge = "FALLING";
      this.points.push([this.posX, this.posY + this.height]);
      this.start_frame_remainder = start_frame_remainder;
    }
  }

  /**
   * changes the line from low to high if the clock has finished ticking
   */
  update() {
    super.update();

    // if we are set to stop transferring, end the line on the LATTER half
    //      the hz signal
    if (
      (frameCount - this.start_frame_remainder) % (60 / hz) < 60 / hz / 2 &&
      !this.transfering &&
      this.edge == "FALLING"
    ) {
      this.edge = "RISING";
      this.points.push([this.posX, this.posY]);
    }
  }
}
