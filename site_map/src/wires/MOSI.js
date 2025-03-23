/**
 * custom Wire implementation for SPI MOSI line
 */

class MOSI extends Wire {
  /**
   * constructs the MOSI wire
   * @param {int} posX
   * @param {int} posY
   * @param {int} width
   * @param {int} height
   * @param {p5.color} color color of the wire
   * @param {Clock} clock reference to the clock this transfer is based on
   * @param {Alert} alert reference to the SS line
   */
  constructor(posX, posY, width, height, color, clock, alert) {
    super(posX, posY, width, height, color);
    this.alert = alert;
    this.clock = clock;

    // for bit banging
    this.bit = 0;
    this.byte = 0;

    // for serial transmission
    this.data_buffer = [0x01, 0x42, 0x00, 0x00, 0x00];
    this.bit_sent = false;
  }

  /**
   * when called, if a transaction is currently not in
   *    progress, will start a new transfer
   */
  initiate_transfer() {
    // send a clock signal
    if (!scene.transaction_in_progress) {
      scene.transaction_in_progress = true;
      this.clock.initiate_transfer();
      this.byte = 0;
    }
  }

  /**
   * updates the state of the line, and determines whether the line
   *    should be high or low dependent on the current data buffer index.
   *    ends transaction when done
   * @returns undefined
   */
  update() {
    // update points
    super.update();

    // if the alert is on the rising edge, it means to idle this line
    if (this.alert.edge == "RISING") {
      if (this.bit >= 8) {
        this.bit = 0;
        this.byte++;
        this.points.push([this.posX, this.posY]);
      }
      return;
    }
    // if the clock edge is rising, set that we need to send a bit
    if (this.clock.edge == "RISING") {
      this.bit_sent = false;
    }

    // add new point if swapping positions
    if (this.clock.edge == "FALLING" && !this.bit_sent) {
      // check if byte exists, if not, set to 0
      if (this.byte >= this.data_buffer.length) this.data_buffer[this.byte] = 0;
      // calculate the height position
      let y =
        this.height * ((this.data_buffer[this.byte] & (1 << this.bit++)) == 0);
      this.points.push([this.posX, this.posY + y]);
      // set wire state
      this.edge = "RISING";
      this.bit_sent = true;
    }
  }
}
