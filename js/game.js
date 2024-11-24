import {Position} from "./position.js";
import {Player} from "./player.js";
import {Google} from "./google.js";

export class Game {
    #state;
    #numberUtil;
    #settings
    #google;
    #player1

    // dependency injection
    constructor(numberUtil) {
        this.#state = GAME_STATUSES.PENDING;
        this.#numberUtil = numberUtil
        this.#settings = GAME_SETTINGS
    }

    async getPlayer1Position() {
        return this.#player1.position
    }

    async initNewPlayer1Position() {
        return this.#player1.initPlayerPosition()
    }

    async #runGoogleJumpInterval() {
        const player1Position = await this.getPlayer1Position();
        setInterval(async () => {
            await this.#google.jump(player1Position);
        }, this.#settings.jumpInterval);
    }

    async getStatus() {
        return this.#state
    }

    async setSettings(settings) {
        if (settings.gridSize.rowsCount * settings.gridSize.columnCount < 4) {
            throw new Error('Grid size must be at least 4x4')
        }
        this.#settings = settings
    }

    async start() {
        this.#state = GAME_STATUSES.IN_PROGRESS
        this.#google = new Google(this.#numberUtil, this.#settings)
        this.#player1 = new Player(this.#numberUtil, this.#settings, 1)


        await this.#runGoogleJumpInterval()
    }

    async getGooglePosition() {
        return this.#google.position
    }
}

export const GAME_STATUSES = {
    PENDING: 'PENDING',
    IN_PROGRESS: 'IN-PROGRESS',
    FINISHED: 'FINISHED'
}

export const GAME_SETTINGS = {
    gridSize: {
        columnCount: 3,
        rowsCount: 6
    },
    jumpInterval: 100
};
