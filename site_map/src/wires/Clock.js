/**
 * custom Wire implementation to represent a SPI SCK line
 */

class Clock extends Wire {
  /**
   * constructs the Clock line
   * @param {int} posX
   * @param {int} posY
   * @param {int} width
   * @param {int} height
   * @param {p5.color} color the color of the line
   * @param {Alert} alert reference to the alert line
   */
  constructor(posX, posY, width, height, color, alert) {
    super(posX, posY, width, height, color);
    this.alert = alert;

    // holds how many frames to subtract by for animating
    this.start_frame_remainder = 0;

    // states
    this.bit_count = 8;
  }

  /**
   * when called, if a transaction isn't in progress,
   *    sets up a new transfer and alerts the alert line
   *    to begin transaction
   */
  initiate_transfer() {
    if (this.bit_count >= 8) {
      this.bit_count = 0;
      this.start_frame_remainder = frameCount % (60 / scene.hz);
      this.alert.alert(this.start_frame_remainder);
    }
  }

  /**
   * handles what state the line should be in depending on the delta
   *    time from previous frame.
   * @returns undefined
   */
  update() {
    // update points
    super.update();

    // escape if we've passed 8 tics
    if (this.bit_count >= 8) {
      return;
    }

    // add new point if swapping positions
    if (
      (frameCount - this.start_frame_remainder) % (60 / scene.hz) >= (60 / scene.hz) / 2 &&
      this.edge != "RISING"
    ) {
      this.points.push([this.posX, this.posY]);
      this.edge = "RISING";
      if (++this.bit_count == 8) {
        this.alert.alert(this.start_frame_remainder);
      }
    } else if (
      (frameCount - this.start_frame_remainder) % (60 / scene.hz) < (60 / scene.hz) / 2 &&
      this.edge != "FALLING"
    ) {
      this.points.push([this.posX, this.posY + this.height]);
      this.edge = "FALLING";
    }
  }
}
