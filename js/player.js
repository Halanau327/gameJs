import {Position} from "./position.js";

export class Player {
    #position
    #id
    #numberUtil
    #settings


    constructor(position, id) {
        if (!(position instanceof Position)) {
            throw new Error('Position should be an instance of Position class');
        }

        this.#position = position
        this.#id = id
    }

    setNumberUtil(numberUtil) {
        this.#numberUtil = numberUtil;
    }

    setSettings(settings) {
        this.#settings = settings;
    }

    get position() {
        return this.#position
    }

    async initPlayerPosition() {
        this.#position = new Position(
            await this.#numberUtil.getRandomNumber(0, this.#settings.gridSize.columnCount - 1),
            await this.#numberUtil.getRandomNumber(0, this.#settings.gridSize.rowsCount - 1)
        );
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