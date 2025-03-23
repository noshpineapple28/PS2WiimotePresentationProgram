/**
 * the scene which allows you to display a PS2 controllers wires
 *    in real time
 */

class LinesOnlyScene extends Scene {
  /**
   * creates wires and ps2 controller, as well as sets the hz
   */
  constructor() {
    super();

    // controls the hz for the entire program
    this.hz = 2.5;
    this.transaction_in_progress = false;

    // positioning of elements
    this.wire_y_start = height * 0.01;
    this.wire_y_spacing = height * 0.11;
    this.wire_width = width;
    this.wire_height = height * 0.08;

    // load wires onto the renderables
    this.create_wires();
  }

  /**
   * creates all wires and adds them to the rendereables
   */
  create_wires() {
    // set alert pin
    this.alert = new Alert(
      0,
      this.wire_y_start + this.wire_y_spacing * 3,
      this.wire_width,
      this.wire_height,
      "yellow"
    );
    this.renderables.push(this.alert);

    // add pins to WIRES array
    this.acknowledge = new Ack(
      0,
      this.wire_y_start,
      this.wire_width,
      this.wire_height,
      color(0, 255, 0)
    );
    this.renderables.push(this.acknowledge);

    this.unknown = new Unk(
      0,
      this.wire_y_start + this.wire_y_spacing,
      this.wire_width,
      this.wire_height,
      color(255, 255, 255)
    );
    this.renderables.push(this.unknown);

    this.clock = new Clock(
      0,
      this.wire_y_start + this.wire_y_spacing * 2,
      this.wire_width,
      this.wire_height,
      "blue",
      this.alert
    );
    this.renderables.push(this.clock);

    this.voltage = new Voltage(
      0,
      this.wire_y_start + this.wire_y_spacing * 4,
      this.wire_width,
      this.wire_height,
      color(255, 0, 0)
    );
    this.renderables.push(this.voltage);

    this.ground = new Ground(
      0,
      this.wire_y_start + this.wire_y_spacing * 5,
      this.wire_width,
      this.wire_height,
      color(0, 0, 0)
    );
    this.renderables.push(this.ground);

    this.vibration = new Vibration(
      0,
      this.wire_y_start + this.wire_y_spacing * 6,
      this.wire_width,
      this.wire_height,
      "gray"
    );
    this.renderables.push(this.vibration);

    this.mosi = new MOSI(
      0,
      this.wire_y_start + this.wire_y_spacing * 7,
      this.wire_width,
      this.wire_height,
      "orange",
      this.clock,
      this.alert
    );
    this.renderables.push(this.mosi);

    this.miso = new MISO(
      0,
      this.wire_y_start + this.wire_y_spacing * 8,
      this.wire_width,
      this.wire_height,
      "brown",
      this.clock,
      this.alert,
      this.acknowledge
    );
    this.renderables.push(this.miso);
  }

  /**
   * Calls the display methods for all renderables
   */
  display() {
    super.display();

    if (this.miso.byte >= this.miso.data_buffer.length || !this.transaction_in_progress) {
      this.miso.initiate_transfer();
      this.miso.byte = 0;
      this.mosi.initiate_transfer();
      this.mosi.byte = 0;
    }

    stroke(42);
    line(mouseX, 0, mouseX, height);
  }
}
