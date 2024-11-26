export class Position {
    #x;
    #y;

    constructor(x, y) {
        if (x < 0 || y < 0) throw new Error('Incorrect coordinates')
        this.#x = x
        this.#y = y
    }

    get x() {
        return this.#x
    }

    get y() {
        return this.#y
    }

    set x(value) {
        this.#x = value
    }

    set y(value) {
       this.#y = value
    }

    toJSON() {
        return {
            x: this.#x,
            y: this.#y
        }
    }

    isEqual(otherPosition) {
        if (otherPosition === null || !(otherPosition instanceof Position)) {
            throw new Error('Other position should be an instance of Position')
        }
        return this.#x === otherPosition.x && this.#y === otherPosition.y
    }
}