/**
 * The PS2 controller allows users to alter the state of the data being
 *    sent, as well as the Hz at which the display updates
 */

/**
 * BUTTOM MAP 1
 */
const BM1_SELECT_MASK = 1 << 0;
const BM1_L3_MASK = 1 << 1;
const BM1_R3_MASK = 1 << 2;
const BM1_START_MASK = 1 << 3;
const BM1_UP_MASK = 1 << 4;
const BM1_RIGHT_MASK = 1 << 5;
const BM1_DOWN_MASK = 1 << 6;
const BM1_LEFT_MASK = 1 << 7;

/**
 * BUTTOM MAP 2
 */
const BM2_L2_MASK = 1 << 0;
const BM2_R2_MASK = 1 << 1;
const BM2_L1_MASK = 1 << 2;
const BM2_R1_MASK = 1 << 3;
const BM2_TRIANGLE_MASK = 1 << 4;
const BM2_O_MASK = 1 << 5;
const BM2_X_MASK = 1 << 6;
const BM2_SQUARE_MASK = 1 << 7;

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
    // display modes
    imageMode(CENTER);
    angleMode(DEGREES);

    // buttons
    this.buttons = [];
    this.create_buttons();
    // analog sticks
    this.left_stick = new AnalogStick(
      this.posX - this.width * 0.12198795180722892,
      this.posY + this.width * 0.07605421686746988,
      this.width * 0.11,
      MEDIA["analog"]
    );
    this.right_stick = new AnalogStick(
      this.posX + this.width * 0.11,
      this.posY + this.width * 0.07605421686746988,
      this.width * 0.11,
      MEDIA["analog"]
    );
  }

  create_buttons() {
    this.buttons = [
      new Button(
        this.posX + this.width * 0.23343373493975902,
        this.posY + this.width * 0.021837349397590362,
        this.width * 0.05,
        this.width * 0.05,
        MEDIA["x"],
        BM2_X_MASK,
        4
      ),
      new Button(
        this.posX + this.width * 0.30271084337349397,
        this.posY - this.width * 0.038403614457831324,
        this.width * 0.05,
        this.width * 0.05,
        MEDIA["circle"],
        BM2_O_MASK,
        4
      ),
      new Button(
        this.posX + this.width * 0.16735966735966737,
        this.posY - this.width * 0.04261954261954262,
        this.width * 0.05,
        this.width * 0.05,
        MEDIA["square"],
        BM2_SQUARE_MASK,
        4
      ),
      new Button(
        this.posX + this.width * 0.2338877338877339,
        this.posY - this.width * 0.09875259875259876,
        this.width * 0.05,
        this.width * 0.05,
        MEDIA["triangle"],
        BM2_TRIANGLE_MASK,
        4
      ),
      // up
      new Button(
        this.posX - this.width * 0.240625,
        this.posY - this.width * 0.0828125,
        this.width * 0.04,
        this.width * 0.05,
        MEDIA["dpad"],
        BM1_UP_MASK,
        3
      ),
      // right
      new Button(
        this.posX - this.width * 0.2,
        this.posY - this.width * 0.0421875,
        this.width * 0.04,
        this.width * 0.05,
        MEDIA["dpad"],
        BM1_RIGHT_MASK,
        3,
        90
      ),
      // down
      new Button(
        this.posX - this.width * 0.240625,
        this.posY - this.width * 0.0005208333333333333,
        this.width * 0.04,
        this.width * 0.05,
        MEDIA["dpad"],
        BM1_DOWN_MASK,
        3,
        180
      ),
      // left
      new Button(
        this.posX - this.width * 0.28125,
        this.posY - this.width * 0.0453125,
        this.width * 0.04,
        this.width * 0.05,
        MEDIA["dpad"],
        BM1_LEFT_MASK,
        3,
        -90
      ),
      // select
      new Button(
        this.posX - this.width * 0.07530120481927711,
        this.posY - this.width * 0.038403614457831324,
        this.width * 0.04,
        this.width * 0.025,
        MEDIA["select"],
        BM1_SELECT_MASK,
        3
      ),
      // analog
      new AnalogButton(
        this.posX,
        this.posY + this.width * 0.029367469879518073,
        this.width * 0.05,
        this.width * 0.025,
        MEDIA["select"]
      ),
      // start
      new Button(
        this.posX + this.width * 0.07,
        this.posY - this.width * 0.038403614457831324,
        this.width * 0.04,
        this.width * 0.025,
        MEDIA["start"],
        BM1_START_MASK,
        3
      ),
      // L1
      new Button(
        this.posX - this.width * 0.23795180722891565,
        this.posY - this.width * 0.2628012048192771,
        this.width * 0.1,
        this.width * 0.04,
        MEDIA["1trigger"],
        BM2_L1_MASK,
        4
      ),
      // R1
      new Button(
        this.posX + this.width * 0.23795180722891565,
        this.posY - this.width * 0.2628012048192771,
        this.width * 0.1,
        this.width * 0.04,
        MEDIA["1trigger"],
        BM2_R1_MASK,
        4,
        0,
        true
      ),
      // L2
      new Button(
        this.posX - this.width * 0.23795180722891565,
        this.posY - this.width * 0.32756024096385544,
        this.width * 0.1,
        this.width * 0.06,
        MEDIA["2trigger"],
        BM2_L2_MASK,
        4
      ),
      // R2
      new Button(
        this.posX + this.width * 0.23795180722891565,
        this.posY - this.width * 0.32756024096385544,
        this.width * 0.1,
        this.width * 0.06,
        MEDIA["2trigger"],
        BM2_R2_MASK,
        4,
        0,
        true
      ),
    ];
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
    hz = round(
      map(
        this.knob_x,
        this.posX - this.width * 0.1,
        this.posX + this.width * 0.1,
        0.25,
        5
      ),
      2
    );

    // display hz
    noStroke();
    text(`Displaying at ${hz} Hz`, this.posX, this.knob_y + this.height * 0.05);
  }

  controller() {
    image(
      MEDIA["controller"],
      this.posX,
      this.posY,
      this.width * 0.8,
      this.width * 0.6
    );

    for (let button of this.buttons) button.display();
    this.left_stick.display();
    this.right_stick.display();
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
    this.controller();
  }
}
