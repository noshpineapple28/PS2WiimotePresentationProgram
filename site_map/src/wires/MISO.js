/**
 * custom Wire implementation for SPI MISO line
 */

class MISO extends Wire {
  /**
   * constructs the MOSI wire
   * @param {int} posX
   * @param {int} posY
   * @param {int} width
   * @param {int} height
   * @param {p5.color} color color of the wire
   * @param {Clock} clock reference to the clock this transfer is based on
   * @param {Alert} alert reference to the SS line
   * @param {Ack} ack reference to the ack line
   */
  constructor(posX, posY, width, height, color, clock, alert, ack) {
    super(posX, posY, width, height, color);
    this.alert = alert;
    this.clock = clock;
    this.ack = ack;

    // for bit banging
    this.bit = 0;
    this.byte = 0;

    // for serial transmission
    this.data_buffer = [0xff, 0x41, 0x5a, 0xff, 0xff];
    this.bit_sent = false;
    this.ack_pinged = false;
  }

  /**
   * when called, if a transaction is currently not in
   *    progress, will start a new transfer
   */
  initiate_transfer() {
    if (!scene.transaction_in_progress) {
      scene.transaction_in_progress = true;
      this.clock.initiate_transfer();
      this.byte = 0;
    }
  }

  /**
   * updates the state of the line, and determines whether the line
   *    should be high or low dependent on the current data buffer index.
   *    will also ping the ack line when done sending a byte EXCLUDING
   *    the last byte.
   * @returns undefined
   */
  update() {
    // update points
    super.update();

    if (this.alert.edge == "RISING") {
      if (this.bit >= 8) {
        this.bit = 0;
        this.byte++;
        this.points.push([this.posX, this.posY]);
        // ping the alert pin if we aren't at end of signal, otherwise end transaction
        if (this.byte < this.data_buffer.length) {
          this.ack.alert(this.alert.start_frame_remainder);
          this.ack_pinged = true;
        } else {
          scene.transaction_in_progress = false;
        }
      } else if (this.ack_pinged && this.ack.acknowledged) {
        // initiate next data cycle after ping
        this.ack_pinged = false;
        // send next byte packet right after!
        this.clock.initiate_transfer();
      }
      return;
    }
    if (this.clock.edge == "RISING") {
      this.bit_sent = false;
    }

    // add new point if swapping positions
    if (this.clock.edge == "FALLING" && !this.bit_sent) {
      let y =
        this.height * ((this.data_buffer[this.byte] & (1 << this.bit++)) == 0);
      this.points.push([this.posX, this.posY + y]);
      this.edge = "RISING";
      this.bit_sent = true;
    }
  }
}
