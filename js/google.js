import {Position} from "./position.js";

export class Google {
    #position
    #numberUtil
    #settings


    constructor(numberUtil, settings) {
        if (!numberUtil || typeof numberUtil.getRandomNumber !== 'function') {
            throw new Error('Invalid numberUtil');
        }

        if (!settings || !settings.gridSize || !settings.gridSize.columns|| !settings.gridSize.rows) {
            throw new Error('Invalid settings');
        }

        this.#numberUtil = numberUtil;
        this.#settings = settings
        this.#position = new Position(
            this.#numberUtil.getRandomNumber(0, this.#settings.gridSize.columns - 1),
            this.#numberUtil.getRandomNumber(0, this.#settings.gridSize.rows - 1))
    }

    async jump(player1Position, player2Position) {
        let newPosition;
        let isEqual = true;

        while (isEqual) {
            newPosition = new Position(
                await this.#numberUtil.getRandomNumber(0, this.#settings.gridSize.columns - 1),
                await this.#numberUtil.getRandomNumber(0, this.#settings.gridSize.rows - 1)
            );

            // Проверка на совпадение с текущей позицией Google и позициями игроков
            isEqual = newPosition.isEqual(this.#position) || newPosition.isEqual(player1Position) || newPosition.isEqual(player2Position)
        }
        this.#position = newPosition;

    }

    get position() {
        return this.#position;
    }
}
