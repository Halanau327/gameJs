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
            expect(googleNewPosition.toJSON()).not.toEqual(googleInitialPosition.toJSON());
        }
    });

    it("player should not have google position after start", async () => {
        for (let i = 0; i < 10; i++) {
            createGame();

            await game.setSettings({
                gridSize: {
                    columnCount: 4,
                    rowsCount: 1
                },
                jumpInterval: 100
            });

            await game.start();

            await delay(150);

            const player1Position = await game.getPlayer1Position();
            const googlePosition = await game.getGooglePosition();

            console.log('Player 1 Position:', player1Position.toJSON());
            console.log('Google Position:', googlePosition.toJSON());

            expect(player1Position.toJSON()).not.toEqual(googlePosition.toJSON());
        }
    });
})

const delay = ms => new Promise(res => setTimeout(res, ms))