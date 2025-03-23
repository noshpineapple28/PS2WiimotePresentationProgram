/**
 * Ananlog button class,
 */

class AnalogButton extends Button {
  toggle() {
    this.pressed = !this.pressed;

    // update MISO line buffer to include or exclude analog sticks
    if (this.pressed) {
      let perc_l_x = round(
        (abs(scene.controller.left_stick.deltaX - scene.controller.left_stick.posX) /
          scene.controller.left_stick.width) *
          0xff
      );
      let perc_l_y = round(
        (abs(scene.controller.left_stick.deltaY - scene.controller.left_stick.posY) /
          scene.controller.left_stick.width) *
          0xff
      );
      let perc_r_x = round(
        (abs(scene.controller.right_stick.deltaX - scene.controller.right_stick.posX) /
          scene.controller.right_stick.width) *
          0xff
      );
      let perc_r_y = round(
        (abs(scene.controller.right_stick.deltaY - scene.controller.right_stick.posY) /
          scene.controller.right_stick.width) *
          0xff
      );

      scene.miso.data_buffer[1] = 0x72;
      scene.miso.data_buffer.push(perc_r_x);
      scene.miso.data_buffer.push(perc_r_y);
      scene.miso.data_buffer.push(perc_l_x);
      scene.miso.data_buffer.push(perc_l_y);
    } else {
      scene.miso.data_buffer[1] = 0x42;
      scene.miso.data_buffer.pop();
      scene.miso.data_buffer.pop();
      scene.miso.data_buffer.pop();
      scene.miso.data_buffer.pop();
    }
  }

  /**
   * detects if a mouse is inside the scene.controller
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
    if (this.pressed) {
      rectMode(CENTER);
      noStroke();
      fill(150, 0, 0);
      rect(
        this.posX,
        this.posY + this.height * 1.5,
        this.width * 0.5,
        this.height * 0.5
      );
      tint_perc = 75;
    }
    tint(tint_perc);
    // renders the image
    image(this.image, this.posX, this.posY, this.width, this.height);
    pop();
  }
}
