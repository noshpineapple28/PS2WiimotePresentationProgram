/**
 * the scene which allows you to display a PS2 controllers wires
 *    in real time
 */

class PS2ControllerLinesScene extends Scene {
  /**
   * creates wires and ps2 controller, as well as sets the hz
   */
  constructor() {
    super();

    // controls the hz for the entire program
    this.hz = 5;
    this.transaction_in_progress = false;

    // positioning of elements
    this.wire_y_start = height * 0.01;
    this.wire_y_spacing = height * 0.11;
    this.wire_width = width / 2;
    this.wire_height = height * 0.08;

    // for a mobile format, change the positioning of elements
    if (window.innerWidth < window.innerHeight) {
      this.wire_y_start = (height / 2) * 0.01;
      this.wire_y_spacing = (height / 2) * 0.11;
      this.wire_width = width;
      this.wire_height = (height / 2) * 0.08;
      // set PS2 to be on the bottom of the screen
      this.controller = new PS2(width / 2, height * 0.75, width, height / 2);
    } else {
      // set PS2 to be on the right side of the screen otherwise
      this.controller = new PS2(width * 0.75, height / 2, width / 2, height);
    }

    // load wires onto the renderables
    this.create_wires();
  }

  /**
   * creates all wires and adds them to the rendereables
   */
  create_wires() {
    // set alert pin
    console.log(this.wire_y_start + this.wire_y_spacing * 3);
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
   * updates all buttons and control sticks on the controller to
   *    update the data buffer
   */
  handleButtonPresses() {
    for (let button of this.controller.buttons) {
      if (button.is_inside()) button.toggle();
    }

    this.controller.pressed();
  }

  /**
   * Calls the display methods for all renderables
   */
  display() {
    super.display();
    this.controller.display();

    stroke(42);
    if (width > height && mouseX <= width / 2) line(mouseX, 0, mouseX, height);
    else if (width < height) line(mouseX, 0, mouseX, height / 2);
  }

  /**
   * handles the click method to deliver click events to all related scene elements
   */
  mouseClicked() {
    this.miso.initiate_transfer();
    this.miso.byte = 0;
    this.mosi.initiate_transfer();
    this.mosi.byte = 0;
    if (mouseIsPressed) this.handleButtonPresses();
  }

  /**
   * handles the touch method to deliver click events to all related scene elements
   */
  touchStarted() {
    this.miso.initiate_transfer();
    this.miso.byte = 0;
    this.mosi.initiate_transfer();
    this.mosi.byte = 0;
    this.handleButtonPresses();
  }
}
