import {Position} from "./position.js";

export class Player {
    #position
    #id

    constructor(position, id) {
        if (!(position instanceof Position)) {
            throw new Error('Position should be an instance of Position class');
        }

        this.#position = position
        this.#id = id
    }

    get position() {
        return this.#position
    }

    get id() {
        return this.#id
    }

    moveTo(newPosition) {
        if (!(newPosition instanceof Position)) {
            throw new Error('New position should be an instance of Position class');
        }
        this.#position = newPosition
    }

    toJSON() {
        return {
            id: this.#id,
            position: this.#position.toJSON()
        };
    }

    isEqual(otherPlayer) {
        if (otherPlayer === null || !(otherPlayer instanceof Player)) {
            throw new Error('Other player should be an instance of Player class');
        }
        return this.#id === otherPlayer.id && this.#position.isEqual(otherPlayer.position);
    }
}