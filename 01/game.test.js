import {Game, GAME_STATUSES} from "./game.js";
import {NumberMagicUtil} from "./number-magic-util.js";

describe("Game", () => {
    it("should return  correct Game status 'STARTED' after start", async () => {
        const numberUtil = new NumberMagicUtil()
        const game = new Game(numberUtil)

        let status = await game.getStatus()
        expect(status).toBe(GAME_STATUSES.PENDING)

        await game.start();

        status = await game.getStatus()

        expect(status).toBe(GAME_STATUSES.IN_PROGRESS)
    })

    it("should return correct Google position that changed every 2 seconds", async () => {
        const numberUtil = new NumberMagicUtil()
        const game = new Game(numberUtil)
        await game.start();

        let googlePosition = await game.getGooglePosition()
        expect(googlePosition).toBeDefined()

        let settings = await game.getSettings()

        for (let i = 0; i < 100; i++) {
            let googlePosition = await game.getGooglePosition()
            await delay(settings.jumpInterval)
            let googlePosition2 = await game.getGooglePosition()
            expect(googlePosition2).not.toEqual(googlePosition)
        }
    })
})

export const delay = (ms) => new Promise((res) => {
    setTimeout(res, ms)
})