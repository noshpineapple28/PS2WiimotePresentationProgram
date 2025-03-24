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

    // state
    this.paused = false;

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

  /**
   * creates all buttons and places them in the buttons array
   */
  create_buttons() {
    this.buttons = [
      /*********************** BM1 ***********************/
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
      // analog sticks buttons
      new Button(
        this.posX - this.width * 0.12198795180722892,
        this.posY + this.width * 0.2,
        this.width * 0.075,
        this.width * 0.075,
        MEDIA["stick_button"],
        BM1_L3_MASK,
        3,
        0,
        false
      ),
      new Button(
        this.posX + this.width * 0.11,
        this.posY + this.width * 0.2,
        this.width * 0.075,
        this.width * 0.075,
        MEDIA["stick_button"],
        BM1_R3_MASK,
        3,
        0,
        false
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

      /*********************** BM2 ***********************/
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
      new Button(
        this.posX + this.width * 0.2338877338877339,
        this.posY - this.width * 0.09875259875259876,
        this.width * 0.05,
        this.width * 0.05,
        MEDIA["triangle"],
        BM2_TRIANGLE_MASK,
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
        this.posX + this.width * 0.23343373493975902,
        this.posY + this.width * 0.021837349397590362,
        this.width * 0.05,
        this.width * 0.05,
        MEDIA["x"],
        BM2_X_MASK,
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

      /*********************** ANALOG ***********************/
      // analog
      new AnalogButton(
        this.posX,
        this.posY + this.width * 0.029367469879518073,
        this.width * 0.05,
        this.width * 0.025,
        MEDIA["select"]
      ),
    ];
  }

  /**
   * called to update the state of the control sticks on the data buffer
   * @returns None
   */
  pressed() {
    // return early if not in analog mode
    // the pause button
    if (this.is_inside_pause_button()) {
      this.paused = !this.paused;
      for (let wire of scene.renderables) {
        wire.paused = !wire.paused;
        if (this.paused)
          wire.start_frame_remainder = frameCount % (60 / scene.hz);
      }
    }

    // control sticks
    if (scene.miso.data_buffer[1] != 0x72) return;

    let perc_l_x = round(
      (abs(this.left_stick.deltaX - this.left_stick.posX) /
        this.left_stick.width) *
        0xff
    );
    let perc_l_y = round(
      (abs(this.left_stick.deltaY - this.left_stick.posY) /
        this.left_stick.width) *
        0xff
    );
    let perc_r_x = round(
      (abs(this.right_stick.deltaX - this.right_stick.posX) /
        this.right_stick.width) *
        0xff
    );
    let perc_r_y = round(
      (abs(this.right_stick.deltaY - this.right_stick.posY) /
        this.right_stick.width) *
        0xff
    );
    scene.miso.data_buffer[5] = perc_r_x;
    scene.miso.data_buffer[6] = perc_r_y;
    scene.miso.data_buffer[7] = perc_l_x;
    scene.miso.data_buffer[8] = perc_l_y;
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
    scene.hz = round(
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
    text(
      `Displaying at ${scene.hz} Hz`,
      this.posX,
      this.knob_y + this.height * 0.05
    );
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

  is_inside_pause_button() {
    return (
      mouseX >= this.posX - this.width * 0.1 &&
      mouseX <= this.posX + this.width * 0.1 &&
      mouseY >= this.posY + this.height * 0.35 - this.width * 0.05 &&
      mouseY <= this.posY + this.height * 0.35 + this.width * 0.05
    );
  }

  pause_button() {
    push();
    rectMode(CENTER);
    noStroke();
    let phrase = "PAUSE";

    // set fills
    let fill_color = 60;
    if (this.paused) {
      phrase = "UNPAUSE";
      fill_color = 45;
    }
    if (this.is_inside_pause_button()) {
      if (mouseIsPressed) fill_color -= 20;
      else fill_color += 11;
    }

    // draw it
    fill(fill_color);
    rect(
      this.posX,
      this.posY + this.height * 0.35,
      this.width * 0.2,
      this.width * 0.1,
      10
    );
    // textAlign(CENTER);
    fill(0);
    text(phrase, this.posX, this.posY + this.height * 0.35);
    pop();
  }

  /**
   * returns a PS2 equivalent of a controllers status
   * @returns Object with equivalent struct fields to PS2 data format
   */
  get_controller() {
    let controller = {
      BM1: 0xff,
      BM2: 0xff,
      RX: 0x7f,
      RY: 0x7f,
      LX: 0x7f,
      LY: 0x7f,
    };

    // BM1
    for (let i = 0; i < 8; i++) {
      if (this.buttons[i].pressed)
        controller.BM1 &= ~this.buttons[i].button_mask;
      else controller.BM1 |= this.buttons[i].button_mask;
    }

    // BM2
    for (let i = 8; i < 16; i++) {
      if (this.buttons[i].pressed)
        controller.BM2 &= ~this.buttons[i].button_mask;
      else controller.BM2 |= this.buttons[i].button_mask;
    }

    let stick = scene.controller.left_stick;
    controller.LX = floor(
      ((stick.deltaX - (stick.posX - stick.width / 2)) / stick.width) * 0xff
    );
    controller.LY = floor(
      ((stick.deltaY - (stick.posY - stick.width / 2)) / stick.width) * 0xff
    );

    stick = scene.controller.right_stick;
    controller.RX = floor(
      ((stick.deltaX - (stick.posX - stick.width / 2)) / stick.width) * 0xff
    );
    controller.RY = floor(
      ((stick.deltaY - (stick.posY - stick.width / 2)) / stick.width) * 0xff
    );

    return controller;
  }

  /**
   * sets the ps2 layout to whatever the given data ha
   * @param cntrl the object reference of a PS2 controller used to set the layout
   */
  set_controller(cntrl) {
    // BM1
    for (let i = 0; i < 8; i++) {
      if (cntrl["BM1"] & (1 << i)) {
        this.buttons[i].pressed = false;
        scene.miso.data_buffer[this.buttons[i].MISO_index] |=
          this.buttons[i].button_mask;
      } else {
        this.buttons[i].pressed = true;
        scene.miso.data_buffer[this.buttons[i].MISO_index] &=
          ~this.buttons[i].button_mask;
      }
    }

    // BM2
    for (let i = 0; i < 8; i++) {
      if (cntrl["BM2"] & (1 << i)) {
        this.buttons[8 + i].pressed = false;
        scene.miso.data_buffer[this.buttons[8 + i].MISO_index] |=
          this.buttons[8 + i].button_mask;
      } else {
        this.buttons[8 + i].pressed = true;
        scene.miso.data_buffer[this.buttons[8 + i].MISO_index] &=
          ~this.buttons[8 + i].button_mask;
      }
    }

    // L stick
    this.left_stick.deltaX =
      this.left_stick.posX -
      this.left_stick.width / 2 +
      (cntrl["LX"] / 0xff) * this.left_stick.width;
    this.left_stick.deltaY =
      this.left_stick.posY -
      this.left_stick.width / 2 +
      (cntrl["LY"] / 0xff) * this.left_stick.width;

    // R stick
    this.right_stick.deltaX =
      this.right_stick.posX -
      this.right_stick.width / 2 +
      (cntrl["RX"] / 0xff) * this.right_stick.width;
    this.right_stick.deltaY =
      this.right_stick.posY -
      this.right_stick.width / 2 +
      (cntrl["RY"] / 0xff) * this.right_stick.width;
  }

  /**
   * displays the PS2 controller
   */
  display() {
    this.slider();
    textAlign(CENTER, CENTER);
    noStroke();
    fill(0);
    this.controller();
    this.pause_button();
  }
}
