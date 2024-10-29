import {Position} from "./position.js";

export class Game {
    #state;
    #googlePosition;
    #numberUtil;
    #settings

    // dependency injection
    constructor(numberUtil) {
        this.#state = GAME_STATUSES.PENDING;
        this.#googlePosition = {x: 1, y: 1}
        this.#numberUtil = numberUtil
        this.#settings = {
            gridSize: {
                columnCount: 3,
                rowsCount: 6
            },
            jumpInterval: 10
        }
    }

    async #jumpGoogle() {
        const newPosition = new Position(
            await this.#numberUtil.getRandomNumber(0, this.#settings.gridSize.columnCount - 1),
            await this.#numberUtil.getRandomNumber(0, this.#settings.gridSize.rowsCount - 1)
        )

        if (!!this.#googlePosition && newPosition.isEqual(this.#googlePosition)) {
            return this.#jumpGoogle()
        }
    }

    async #runGoogleJumpInterval() {
        setInterval(async () => {
            await this.#jumpGoogle()
        }, this.#settings.jumpInterval)
    }

    async getStatus() {
        return this.#state
    }

    async getSettings() {
        return this.#settings
    }

    async start() {
        this.#state = GAME_STATUSES.IN_PROGRESS
        await this.#jumpGoogle()
        await this.#runGoogleJumpInterval()
    }

    async getGooglePosition() {
        return this.#googlePosition
    }
}

export const GAME_STATUSES = {
    PENDING: 'PENDING',
    IN_PROGRESS: 'IN-PROGRESS',
    FINISHED: 'FINISHED'
}