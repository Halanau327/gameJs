import {Position} from "./position.js";

export class Google {
    #position
    #numberUtil
    #settings

    constructor(numberUtil, settings) {
        if (!numberUtil || typeof numberUtil.getRandomNumber !== 'function') {
            throw new Error('Invalid numberUtil');
        }
        if (!settings || !settings.gridSize || !settings.gridSize.columnCount || !settings.gridSize.rowsCount) {
            throw new Error('Invalid settings');
        }

        this.#numberUtil = numberUtil;
        this.#settings = settings
        this.#position = new Position(
            this.#numberUtil.getRandomNumber(0, this.#settings.gridSize.columnCount - 1),
                this.#numberUtil.getRandomNumber(0, this.#settings.gridSize.rowsCount - 1))
    }

    async jump(playerPosition) {
        let newPosition;
        let isEqual = true;

        while (isEqual) {
            newPosition = new Position(
                await this.#numberUtil.getRandomNumber(0, this.#settings.gridSize.columnCount - 1),
                await this.#numberUtil.getRandomNumber(0, this.#settings.gridSize.rowsCount - 1)
            );

            // Проверка на совпадение с текущей позицией Google и позицией игрока
            isEqual = newPosition.isEqual(this.#position) || newPosition.isEqual(playerPosition);
        }

        this.#position = newPosition;
        // console.log('Google jumped to:', this.#position.x, this.#position.y);
    }

    get position() {
        return this.#position;
    }
}
