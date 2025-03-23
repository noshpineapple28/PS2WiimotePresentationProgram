/**
 * base class that represents the overall buttons on a PS2 controller
 */

class Button {
  /**
   * construct a custom button
   * @param {int} posX
   * @param {int} posY
   * @param {int} width
   * @param {int} height
   * @param {p5.image} image image of the button
   * @param {int} button_mask the mask for the button press
   * @param {int} MISO_index the index in the MISO buffer that this element belongs to
   * @param {int} rot degrees to rotate an image
   * @param {boolean} flip determines if the image of the button should be flipped horizontally
   */
  constructor(
    posX,
    posY,
    width,
    height,
    image,
    button_mask,
    MISO_index,
    rot_deg = 0,
    flip = false
  ) {
    this.posX = posX;
    this.posY = posY;
    this.width = width;
    this.height = height;
    this.image = image;
    this.button_mask = button_mask;
    this.MISO_index = MISO_index;
    this.rot_deg = rot_deg;
    this.flip = flip;

    // button press state
    this.pressed = false;
  }

  toggle() {
    this.pressed = !this.pressed;

    // update MISO line buffer
    if (this.pressed)
      scene.miso.data_buffer[this.MISO_index] &= ~this.button_mask;
    else scene.miso.data_buffer[this.MISO_index] |= this.button_mask;
  }

  /**
   * detects if a mouse is inside the controller
   * @returns true if the mouse is inside the button, false if not
   */
  is_inside() {
    return (
      mouseX >= this.posX - this.width * 0.5 &&
      mouseX <= this.posX + this.width * 0.5 &&
      mouseY >= this.posY - this.height * 0.5 &&
      mouseY <= this.posY + this.height * 0.5
    );
  }

  display() {
    // tint if mouse is over it
    push();
    let tint_perc = 255;
    // determines the tinting
    if (this.is_inside()) tint_perc = 125;
    if (this.pressed) tint_perc = 75;
    tint(tint_perc);
    // renders the image
    if (this.rot_deg) {
      push();
      translate(this.posX, this.posY);
      rotate(this.rot_deg);
      image(this.image, 0, 0, this.width, this.height);
      pop();
    } else if (this.flip) {
      push();
      translate(this.posX, this.posY);
      scale(-1, 1);
      image(this.image, 0, 0, this.width, this.height);
      pop();
    } else {
      image(this.image, this.posX, this.posY, this.width, this.height);
    }
    pop();
  }
}
