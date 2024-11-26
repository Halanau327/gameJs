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

    async getGooglePosition() {
        return this.#google.position
    }

    async getPlayer1Position() {
        return this.#player1.position
    }

    async movePlayer1(direction) {
        const googlePosition = await this.getGooglePosition();

        const player1Position = await this.getPlayer1Position();


        const delta = {
            x: 0,
            y: 0
        }

        switch (direction) {
            case MOVE_DIRECTIONS.UP:
                delta.y = -1;
                break;
            case MOVE_DIRECTIONS.DOWN:
                delta.y = 1;
                break;
            case MOVE_DIRECTIONS.LEFT:
                delta.x = -1;
                break;
            case MOVE_DIRECTIONS.RIGHT:
                delta.x = 1;
                break;
            default:
                throw new Error('Invalid direction');
        }

        let newPosition

        try {
            newPosition = new Position(
                player1Position.x + delta.x,
                player1Position.y + delta.y
            );
        } catch (e) {
            return
        }

        let isInsideGrid = newPosition.x >= 0 && newPosition.x < this.#settings.gridSize.columnCount &&
            newPosition.y >= 0 && newPosition.y < this.#settings.gridSize.rowsCount;

        if (!isInsideGrid) {
            return;
        }

        this.#player1.position = newPosition;

        if (newPosition.isEqual(googlePosition)) {
            this.#state = GAME_STATUSES.FINISHED;
        }
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
        this.#player1 = new Player(this.#numberUtil, this.#settings, 1)
        this.#google = new Google(this.#numberUtil, this.#settings)
        await this.#runGoogleJumpInterval()
    }
}

export const GAME_STATUSES = {
    PENDING: 'PENDING',
    IN_PROGRESS: 'IN-PROGRESS',
    FINISHED: 'FINISHED'
}

export const GAME_SETTINGS = {
    gridSize: {
        columnCount: 2,
        rowsCount: 2
    },
    jumpInterval: 100
};

export const MOVE_DIRECTIONS = {
    UP: 'UP',
    DOWN: 'DOWN',
    LEFT: 'LEFT',
    RIGHT: 'RIGHT'
}