import {Game, GAME_STATUSES} from "./game.js";
import {NumberMagicUtil} from "./number-magic-util.js";

describe("Game", () => {
    let game

    function createGame() {
        const numberUtil = new NumberMagicUtil()
        game = new Game(numberUtil)
    }

    beforeEach(async () => {
        createGame()
    })

    it("should return  correct Game status 'STARTED' after start", async () => {
        let status = await game.getStatus()
        expect(status).toBe(GAME_STATUSES.PENDING)

        await game.start();

        status = await game.getStatus()

        expect(status).toBe(GAME_STATUSES.IN_PROGRESS)
    })

    it("should return correct Google position after start", async () => {
            for (let i = 0; i < 10; i++) {
                createGame()
                await game.getSettings()
                await game.start();

                let googlePosition = await game.getGooglePosition()
                await delay(10)
                let googlePosition2 = await game.getGooglePosition()
                expect(googlePosition).not.toEqual(googlePosition2)
            }
        }
    )
})


const delay = ms => new Promise(res => setTimeout(res, ms))