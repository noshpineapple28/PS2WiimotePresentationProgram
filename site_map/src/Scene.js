/**
 * Abstract wrapper class for the scene, used to
 *    seamlessly transition between app examples
 */

class Scene {
  /**
   * renderables represent all items that can be rendered
   *    or updated
   */
  constructor() {
    this.renderables = [];
  }

  /**
   * handles the update for all renderables
   */
  update() {
    for (let item of this.renderables) {
      item.update();
    }
  }

  /**
   * Calls the display methods for all renderables
   */
  display() {
    for (let item of this.renderables) {
      item.display();
    }
  }

  /**
   * handles the click method to deliver click events to all related scene elements
   */
  mouseClicked() {}

  /**
   * handles the touch method to deliver click events to all related scene elements
   */
  touchStarted() {}
}
