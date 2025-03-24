/**
 * Ananlog button class,
 */

class AnalogButton extends Button {
  toggle() {
    this.pressed = !this.pressed;

    // update MISO line buffer to include or exclude analog sticks
    if (this.pressed) {
      let stick = scene.controller.left_stick;
      let perc_l_x = floor(
        ((stick.deltaX - (stick.posX - stick.width / 2)) / stick.width) * 0xff
      );
      let perc_l_y = floor(
        ((stick.deltaY - (stick.posY - stick.width / 2)) / stick.width) * 0xff
      );

      stick = scene.controller.right_stick;
      let perc_r_x = floor(
        ((stick.deltaX - (stick.posX - stick.width / 2)) / stick.width) * 0xff
      );
      let perc_r_y = floor(
        ((stick.deltaY - (stick.posY - stick.width / 2)) / stick.width) * 0xff
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
