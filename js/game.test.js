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
                createGame()
                await game.start();

                let googlePosition = await game.getGooglePosition()
                await delay(250)
                let googlePosition2 = await game.getGooglePosition()

                expect(googlePosition).not.toEqual(googlePosition2);
            }
        }
    )

    it("google should have random correct position after jump interval", async () => {
        for (let i = 0; i < 20; i++) {
            createGame();

            await game.setSettings({
                gridSize: {
                    columnCount: 4,
                    rowsCount: 2
                },
                jumpInterval: 100
            });

            await game.start();

            // Получаем начальную позицию Google
            const googleInitialPosition = await game.getGooglePosition();

            // Задержка для ожидания прыжка
            await delay(150);

            // Получаем новую позицию Google
            const googleNewPosition = await game.getGooglePosition();

            // Проверяем, что новая позиция отличается от начальной
            expect(googleNewPosition).toEqual(googleInitialPosition);
        }
    });

    it("player should have random correct positions after start", async () => {
        for (let i = 0; i < 10; i++) {
            createGame()

            await game.setSettings({
                gridSize: {
                    columnCount: 4,
                    rowsCount: 1
                },
                jumpInterval: 100
            })

            await game.start();
            await delay(150);

            const player1NewPosition = await game.getPlayer1Position();

            expect(player1NewPosition).not.toEqual({x: 1, y: 2});

        }
    });
})


const delay = ms => new Promise(res => setTimeout(res, ms))