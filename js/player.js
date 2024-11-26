import {Position} from "./position.js";

export class Player {
    #position
    #id
    #numberUtil
    #settings

    constructor(numberUtil, settings, id) {
        this.#numberUtil = numberUtil;
        this.#settings = settings;
        this.#id = id;
        this.#position = new Position(
            this.#numberUtil.getRandomNumber(0, this.#settings.gridSize.columnCount - 1),
            this.#numberUtil.getRandomNumber(0, this.#settings.gridSize.rowsCount - 1)
        );
    }

    get position() {
        return this.#position
    }

    set position(newPosition) {
        this.#position = newPosition;
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