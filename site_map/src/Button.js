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
   * @param {int} rot degrees to rotate an image
   */
  constructor(posX, posY, width, height, image, rot_deg = 0) {
    this.posX = posX;
    this.posY = posY;
    this.width = width;
    this.height = height;
    this.image = image;
    this.rot_deg = rot_deg;

    // button press state
    this.pressed = false;
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
    } else {
      image(this.image, this.posX, this.posY, this.width, this.height);
    }
    pop();
  }
}
