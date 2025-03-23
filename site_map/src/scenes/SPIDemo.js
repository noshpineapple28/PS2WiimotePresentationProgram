/**
 * the scene which allows you to display a PS2 controllers wires
 *    in real time
 */

class SPIDemo extends Scene {
  /**
   * creates wires and ps2 controller, as well as sets the hz
   */
  constructor() {
    super();

    // controls the hz for the entire program
    this.hz = 1;
    this.transaction_in_progress = false;

    // positioning of elements
    this.wire_y_start = height * 0.01;
    this.wire_y_spacing = height * 0.11;
    this.wire_width = width;
    this.wire_height = height * 0.08;

    this.create_wires();
  }

  /**
   * creates all wires and adds them to the rendereables
   */
  create_wires() {
    /************************** UNUSED BUT NEEDED **************************/
    // add pins to WIRES array
    this.acknowledge = new Ack(
      0,
      -1000,
      this.wire_width,
      this.wire_height,
      color(0, 255, 0)
    );
    this.renderables.push(this.acknowledge);

    /************************** USED **************************/
    // set alert pin
    this.alert = new Alert(
      0,
      height * .7,
      width,
      height * .2,
      "yellow"
    );
    this.renderables.push(this.alert);

    this.clock = new Clock(
      0,
      height * .07,
      width,
      height * .2,
      "blue",
      this.alert
    );
    this.renderables.push(this.clock);

    this.miso = new MISO(
      0,
      height * .49,
      width,
      height * .2,
      "brown",
      this.clock,
      this.alert,
      this.acknowledge
    );
    this.renderables.push(this.miso);
    this.miso.data_buffer = [0x01, 0x02, 0x03];

    this.mosi = new MOSI(
      0,
      height * .28,
      width,
      height * .2,
      "orange",
      this.clock,
      this.alert
    );
    this.renderables.push(this.mosi);
    this.mosi.data_buffer = [0x03, 0x02, 0x01];
  }

  /**
   * Calls the display methods for all renderables
   */
  display() {
    super.display();

    stroke(42);
    line(mouseX, 0, mouseX, height);
  }

  /**
   * handles the click method to deliver click events to all related scene elements
   */
  mouseClicked() {
    this.miso.initiate_transfer();
    this.miso.byte = 0;
  }

  /**
   * handles the touch method to deliver click events to all related scene elements
   */
  touchStarted() {
    this.miso.initiate_transfer();
    this.miso.byte = 0;
  }
}
