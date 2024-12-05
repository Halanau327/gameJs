import {Position} from "./position.js";
import {Player} from "./player.js";
import {Google} from "./google.js";
import {DEFAULT_SETTINGS} from "./settings.js";

export class Game {
    #state;
    #numberUtil;
    #settings
    #google;
    #player1
    #player2
    #player1Score = 0;
    #player2Score = 0;

    // dependency injection
    constructor(numberUtil) {
        this.#state = GAME_STATUSES.PENDING;
        this.#numberUtil = numberUtil
        this.#settings = DEFAULT_SETTINGS;
    }

    async getGooglePosition() {
        return this.#google.position
    }

    async getPlayer1Position() {
        return this.#player1.position
    }

    async getPlayer2Position() {
        return this.#player2.position;
    }

    async movePlayer1(direction) {
        await this.#movePlayer(this.#player1, direction);
    }

    async movePlayer2(direction) {
        await this.#movePlayer(this.#player2, direction);
    }

    async #movePlayer(player, direction) {
        const googlePosition = await this.getGooglePosition();
        const player1Position = await this.getPlayer1Position();
        const player2Position = await this.getPlayer2Position();
        const playerPosition = player.position;

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
                playerPosition.x + delta.x,
                playerPosition.y + delta.y
            );
        } catch (e) {
            return
        }

        let isInsideGrid = newPosition.x >= 0 && newPosition.x < this.#settings.gridSize.columns &&
            newPosition.y >= 0 && newPosition.y < this.#settings.gridSize.rows;

        if (!isInsideGrid) {
            return;
        }

        // Проверка на совпадение с текущей позицией Google и позициями игроков
        if (newPosition.isEqual(player1Position) || newPosition.isEqual(player2Position)) {
            return;
        }

        player.position = newPosition;

        if (newPosition.isEqual(googlePosition)) {
            if (player === this.#player1) {
                this.#player1Score++
            } else if (player === this.#player2) {
                this.#player2Score++
            }
        }

        await this.#google.jump(player1Position, player2Position)

        // Проверка на победу
        if (this.#player1Score >= this.#settings.pointsToWin || this.#player2Score >= this.#settings.pointsToWin) {
            this.#state = GAME_STATUSES.FINISHED;
        }
    }

    async #runGoogleJumpInterval() {
        const player1Position = await this.getPlayer1Position();
        const player2Position = await this.getPlayer2Position();
        setInterval(async () => {
            await this.#google.jump(player1Position, player2Position);
        }, this.#settings.jumpInterval);
    }

    async getStatus() {
        return this.#state
    }

    async getSettings() {
        return this.#settings
    }

    async setSettings(settings) {
        if (settings.gridSize.rows * settings.gridSize.columns < 4) {
            throw new Error('Grid size must be at least 4x4')
        }
        this.#settings = settings
    }

    async start() {
        this.#state = GAME_STATUSES.IN_PROGRESS
        this.#player1 = new Player(this.#numberUtil, this.#settings, 1)
        this.#player2 = new Player(this.#numberUtil, this.#settings, 2)
        this.#google = new Google(this.#numberUtil, this.#settings)
        await this.#runGoogleJumpInterval()
    }

    get player1Score() {
        return this.#player1Score;
    }

    get player2Score() {
        return this.#player2Score;
    }
}

export const GAME_STATUSES = {
    PENDING: 'PENDING',
    IN_PROGRESS: 'IN-PROGRESS',
    FINISHED: 'FINISHED'
}

export const MOVE_DIRECTIONS = {
    UP: 'UP',
    DOWN: 'DOWN',
    LEFT: 'LEFT',
    RIGHT: 'RIGHT'
}