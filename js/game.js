import {Position} from "./position.js";
import {Player} from "./player.js";
import {Google} from "./google.js";

export class Game {
    #state;
    #google;
    #numberUtil;
    #settings
    #players

    // dependency injection
    constructor(numberUtil) {
        this.#state = GAME_STATUSES.PENDING;
        this.#numberUtil = numberUtil
        this.#settings = GAME_SETTINGS
        this.#google = new Google(this.#numberUtil, this.#settings)
        this.#players = []
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

    async start() {
        this.#state = GAME_STATUSES.IN_PROGRESS
        await this.#initializePlayers();
        await this.#google.jump()
        await this.#runGoogleJumpInterval()
    }

    async getGooglePosition() {
        return this.#google.position
    }

    addPlayer(player) {
        if (!(player instanceof Player)) {
            throw new Error('Player should be an instance of Player class');
        }
        this.#players.push(player);
    }

    getPlayers() {
        return this.#players
    }

    async movePlayer(playerId, newPosition) {
        const player = this.#players.find(p => p.id === playerId)
        if (!player) {
            throw new Error('Player not found');
        }
        player.moveTo(newPosition)

        if (player.position.isEqual(this.#google.position)) {
            this.#state = GAME_STATUSES.FINISHED
            console.log(`Player ${player.id} caught Google`)
        }
    }

    async #initializePlayers() {
        for (const player of this.#players) {
            const newPosition = new Position(
                await this.#numberUtil.getRandomNumber(0, this.#settings.gridSize.columnCount - 1),
                await this.#numberUtil.getRandomNumber(0, this.#settings.gridSize.rowsCount - 1)
            );
            await this.movePlayer(player.id, newPosition);
        }
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