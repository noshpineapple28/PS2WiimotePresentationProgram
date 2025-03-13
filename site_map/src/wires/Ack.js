/**
 * custom wire representation to control the PS2 ack line
 */

class Ack extends Wire {
  /**
   * constructs the ack line
   * @param {int} posX
   * @param {int} posY
   * @param {int} width
   * @param {int} height
   * @param {p5.color} color the color of the wire
   */
  constructor(posX, posY, width, height, color) {
    super(posX, posY, width, height, color);

    this.start_frame_remainder = 0;

    // states
    this.acknowledged = true;
  }

  /**
   * when alerted, will trigger a ack pulse
   * @param {int} start_frame_remainder frames to offset animation by
   */
  alert(start_frame_remainder) {
    this.start_frame_remainder = start_frame_remainder;
    this.acknowledged = false;
  }

  /**
   * if set to pulse the acknowledge line, will pulse the line quickly
   *    based on current frame
   * @returns undefined
   */
  update() {
    super.update();

    if (this.acknowledged) return;

    // add new point if swapping positions
    if (
      (frameCount - this.start_frame_remainder) % (60 / hz / 4) >=
        60 / hz / 4 / 2 &&
      this.edge != "FALLING"
    ) {
      this.points.push([this.posX, this.posY + this.height]);
      this.edge = "FALLING";
    } else if (
      (frameCount - this.start_frame_remainder) % (60 / hz / 4) <
        60 / hz / 4 / 2 &&
      this.edge != "RISING"
    ) {
      this.points.push([this.posX, this.posY]);
      this.edge = "RISING";
      this.acknowledged = true;
    }
  }
}
