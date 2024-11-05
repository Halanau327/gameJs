import {Position} from "./position.js";

export class Google {
    #position
    #numberUtil
    #settings

    constructor(numberUtil, settings) {
        this.#numberUtil = numberUtil;
        this.#settings = settings
        this.#position = new Position(1, 1)
    }

    async jump() {
        const newPosition = new Position(
            await this.#numberUtil.getRandomNumber(0, this.#settings.gridSize.columnCount - 1),
            await this.#numberUtil.getRandomNumber(0, this.#settings.gridSize.rowsCount - 1)
        )

        if (newPosition.isEqual(this.#position)) {
            return this.jump();
        }

        this.#position = newPosition;
    }

    get position() {
        return this.#position;
    }
}