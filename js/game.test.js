import {Game, GAME_STATUSES} from "./game.js";
import {NumberMagicUtil} from "./number-magic-util.js";
import {Position} from "./position.js";
import {Player} from "./player.js";

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

    it("google should return correct Google position after start", async () => {
            for (let i = 0; i < 10; i++) {
                await game.getSettings()
                await game.start();

                let googlePosition = await game.getGooglePosition()
                await delay(300)
                let googlePosition2 = await game.getGooglePosition()


                expect(googlePosition2).toEqual(expect.objectContaining({
                    x: expect.not.objectContaining({x: googlePosition.x}),
                    y: expect.not.objectContaining({y: googlePosition.y})
                }));
            }
        }
    )

    it("google should have random correct position after jump interval", async () => {
        await game.getSettings();
        await game.start();

        const settings = await game.getSettings();
        const {columnCount, rowsCount} = settings.gridSize;

        for (let i = 0; i < 10; i++) {
            let googlePositionBefore = await game.getGooglePosition();

            // Проверяем, что позиция Google находится в пределах сетки
            expect(googlePositionBefore.x).toBeGreaterThanOrEqual(0);
            expect(googlePositionBefore.x).toBeLessThan(columnCount);
            expect(googlePositionBefore.y).toBeGreaterThanOrEqual(0);
            expect(googlePositionBefore.y).toBeLessThan(rowsCount);

            await delay(settings.jumpInterval + 50); // Добавляем небольшую задержку, чтобы убедиться, что интервал прошел

        }
    });

    it("player should have random correct positions after start", async () => {
        for (let i = 0; i < 10; i++) {
            createGame()
            const player1 = new Player(new Position(0, 0), 1)
            game.addPlayer(player1)

            const playerPosition1 = player1.position;

            await game.getSettings();
            await game.start()

            const playerPosition2 = player1.position;

            expect(playerPosition1).not.toEqual(playerPosition2);

        }
    });
})


const delay = ms => new Promise(res => setTimeout(res, ms))