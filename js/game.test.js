import {Game, GAME_STATUSES, MOVE_DIRECTIONS} from "./game.js";
import {NumberMagicUtil} from "./number-magic-util.js";
import {Position} from "./position.js";

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

            expect(player1Position.toJSON()).not.toEqual(googlePosition.toJSON());
        }
    });

    it("movement of player is correct", async () => {
        class MockFakeNumberUtility extends NumberMagicUtil {
            #returnsNumbers = [
                /*player1*/ 2, 2,
                /*google*/ 0, 2
            ]

            #callsCount = 0;

            getRandomNumber() {
                return this.#returnsNumbers[this.#callsCount++]
            }
        }

        const mockNumberUtil = new MockFakeNumberUtility();

        const game = new Game(mockNumberUtil)

        await game.setSettings({
            gridSize: {
                columnCount: 3,
                rowsCount: 3
            },
            jumpInterval: 100
        })

        await game.start();

        let position = await game.getPlayer1Position()
        let googlePosition = await game.getGooglePosition()
        expect(position).toEqual(new Position(2, 2))
        expect(googlePosition).toEqual(new Position(0, 2))

        // [  ] [  ] [  ]
        // [  ] [  ] [  ]
        // [ g] [  ] [p1]

        await game.movePlayer1(MOVE_DIRECTIONS.DOWN)

        expect(position).toEqual(new Position(2, 2))

        // [  ] [  ] [  ]
        // [  ] [  ] [  ]
        // [ g] [  ] [p1]

        await game.movePlayer1(MOVE_DIRECTIONS.RIGHT)
        position = await game.getPlayer1Position()
        expect(position).toEqual(new Position(2, 2))

        // [  ] [  ] [  ]
        // [  ] [  ] [  ]
        // [ g] [  ] [p1]

        await game.movePlayer1(MOVE_DIRECTIONS.UP)
        position = await game.getPlayer1Position()
        expect(position).toEqual(new Position(2, 1))

        // [  ] [  ] [  ]
        // [  ] [  ] [p1]
        // [ g] [  ] [  ]

        await game.movePlayer1(MOVE_DIRECTIONS.LEFT)
        position = await game.getPlayer1Position()
        expect(position).toEqual(new Position(1, 1))

        // [  ] [  ] [  ]
        // [  ] [p1] [  ]
        // [ g] [  ] [  ]

        await game.movePlayer1(MOVE_DIRECTIONS.UP)
        position = await game.getPlayer1Position()
        expect(position).toEqual(new Position(1, 0))

        // [  ] [p1] [  ]
        // [  ] [  ] [  ]
        // [ g] [  ] [  ]

        await game.movePlayer1(MOVE_DIRECTIONS.UP)
        position = await game.getPlayer1Position()
        expect(position).toEqual(new Position(1, 0))

        // [  ] [p1] [  ]
        // [  ] [  ] [  ]
        // [ g] [  ] [  ]

        await game.movePlayer1(MOVE_DIRECTIONS.LEFT)
        position = await game.getPlayer1Position()
        expect(position).toEqual(new Position(1, 0))

        // [p1] [  ] [  ]
        // [  ] [  ] [  ]
        // [ g] [  ] [  ]

        await game.movePlayer1(MOVE_DIRECTIONS.LEFT)
        position = await game.getPlayer1Position()
        expect(position).toEqual(new Position(0, 0))

        // [p1] [  ] [  ]
        // [  ] [  ] [  ]
        // [ g] [  ] [  ]

        await game.movePlayer1(MOVE_DIRECTIONS.DOWN)
        position = await game.getPlayer1Position()
        expect(position).toEqual(new Position(0, 1))

        // [  ] [  ] [  ]
        // [p1] [  ] [  ]
        // [ g] [  ] [  ]

    });
})


const delay = ms => new Promise(res => setTimeout(res, ms))