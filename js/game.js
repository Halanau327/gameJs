import {Position} from "./position.js";
import {Player} from "./player.js";
import {Google} from "./google.js";

export class Game {
    #state;
    #google;
    #numberUtil;
    #settings
    #player1
    #player2

    // dependency injection
    constructor(numberUtil) {
        this.#state = GAME_STATUSES.PENDING;
        this.#numberUtil = numberUtil
        this.#settings = GAME_SETTINGS
        this.#google = new Google(this.#numberUtil, this.#settings)
        this.#player1 = this.#createPlayer(1)
        this.#player2 = this.#createPlayer(2)

    }

    #createPlayer(id) {
        const position = new Position(1, 1);
        const player = new Player(position, id);
        player.setNumberUtil(this.#numberUtil);
        player.setSettings(this.#settings);
        return player;
    }

    async getPlayer1Position() {
        return this.#player1.position
    }

    async #runGoogleJumpInterval() {
        setInterval(async () => {
            await this.#google.jump()
        }, this.#settings.jumpInterval)
    }

    async getStatus() {
        return this.#state
    }

    async getSettings() {
        return this.#settings
    }

    async setSettings(settings) {
        if (settings.gridSize.rowsCount * settings.gridSize.columnCount < 4) {
            throw new Error('Grid size must be at least 4x4')
        }
        this.#settings = settings
    }

    async start() {
        this.#state = GAME_STATUSES.IN_PROGRESS
        await this.#player1.initPlayerPosition()
        await this.#google.jump()
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