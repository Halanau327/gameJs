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
                columnCount: 1,
                rowsCount: 2
            },
            jumpInterval: 10
        }
    }

    #jumpGoogle() {

        const newGooglePosition = {
            x: this.#numberUtil.getRandomNumber(0, this.#settings.gridSize.x),
            y: this.#numberUtil.getRandomNumber(0, this.#settings.gridSize.y),
        }
    }


    async getStatus() {
        return this.#state
    }

    async start() {
        setInterval(this.#jumpGoogle.bind(this), 2000)
        this.#state = GAME_STATUSES.IN_PROGRESS
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