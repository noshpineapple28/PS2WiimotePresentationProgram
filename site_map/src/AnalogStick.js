/**
 * class to represent the state of a analog control stick
 */
class AnalogStick {
  /**
   * construct a custom button
   * @param {int} posX
   * @param {int} posY
   * @param {int} width
   * @param {int} height
   * @param {p5.image} image image of the button
   */
  constructor(posX, posY, width, image) {
    this.posX = posX;
    this.posY = posY;
    this.deltaX = posX;
    this.deltaY = posY;
    this.posY = posY;
    this.width = width;
    this.image = image;
  }

  /**
   * detects if a mouse is inside the controller
   * @returns true if the mouse is within the analog stick section
   */
  is_inside() {
    return dist(mouseX, mouseY, this.posX, this.posY) <= this.width * 0.5;
  }

  /**
   * draw the sticks on the controller
   */
  display() {
    // offset controller based on mouse position
    if (mouseIsPressed && this.is_inside()) {
      this.deltaX = mouseX;
      this.deltaY = mouseY;
    }
    push();
    noStroke();
    fill(48);
    ellipse(this.posX, this.posY, this.width);
    pop();
    image(this.image, this.deltaX, this.deltaY, this.width, this.width);
  }
}
