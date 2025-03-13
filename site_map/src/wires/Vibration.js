/**
 * container for the vibration line
 */

class Vibration extends Wire {
    /**
     * constructs the wire
     * @param {int} posX
     * @param {int} posY
     * @param {int} width
     * @param {int} height
     * @param {p5.color} color the color of the wire
     */
    constructor(posX, posY, width, height, color) {
        super(posX, posY, width, height, color);

        // sets the line to constantly low
        this.points = [[this.posX, this.posY + this.height]];
    }
}
