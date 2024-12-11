import {MOVE_DIRECTIONS} from "../game.js";

export class Controller {
    #view;
    #game;

    constructor(view, game) {
        this.#view = view;
        this.#game = game;

        this.#view.onStartGame(this.handleStartGame.bind(this));
        this.#view.onPlayAgain(this.handlePlayAgain.bind(this));

        this.#game.subscribe(this.updateView.bind(this));

        // Добавляем обработчик событий клавиатуры
        document.addEventListener('keydown', this.handleKeyDown.bind(this));
    }

    async handleStartGame(settings) {
        await this.#game.setSettings(settings);
        await this.#game.start(); // Инициализация игроков и Google
        this.#view.showGrid(); // Показываем сетку после старта игры
        await this.updateView(); // Обновляем представление
    }

    async handlePlayAgain() {
        await this.#game.start();
        this.#view.hideModal();
        this.#view.showGrid(); // Показываем сетку после перезапуска игры
        await this.updateView();
    }

    async updateView() {
        const googlePosition = await this.#game.getGooglePosition();
        const player1Position = await this.#game.getPlayer1Position();
        const player2Position = await this.#game.getPlayer2Position();
        const player1Score = this.#game.player1Score;
        const player2Score = this.#game.player2Score;
        const gameStatus = await this.#game.getStatus();
        const settings = await this.#game.getSettings();

        const viewModel = {
            googlePosition,
            player1Position: player1Position,
            player2Position: player2Position,
            settings
        };

        this.#view.updateGrid(viewModel);
        this.#view.updateScore(player1Score, player2Score);

        if (gameStatus === 'FINISHED') {
            const title = player1Score >= settings.pointsToWin ? 'You Win!' : 'You Lose!';
            const text = player1Score >= settings.pointsToWin ? 'Congratulations' : 'You\'ll be lucky next time';
            this.#view.showModal(title, text, player1Score, player2Score);
        }
    }

    async init() {
        await this.updateView();
    }

    async handleKeyDown(event) {
        const key = event.key;

        switch (key) {
            case 'ArrowUp':
                await this.#game.movePlayer1(MOVE_DIRECTIONS.UP);
                break;
            case 'ArrowDown':
                await this.#game.movePlayer1(MOVE_DIRECTIONS.DOWN);
                break;
            case 'ArrowLeft':
                await this.#game.movePlayer1(MOVE_DIRECTIONS.LEFT);
                break;
            case 'ArrowRight':
                await this.#game.movePlayer1(MOVE_DIRECTIONS.RIGHT);
                break;
            case 'w':
                await this.#game.movePlayer2(MOVE_DIRECTIONS.UP);
                break;
            case 's':
                await this.#game.movePlayer2(MOVE_DIRECTIONS.DOWN);
                break;
            case 'a':
                await this.#game.movePlayer2(MOVE_DIRECTIONS.LEFT);
                break;
            case 'd':
                await this.#game.movePlayer2(MOVE_DIRECTIONS.RIGHT);
                break;
            default:
                break;
        }
        await this.updateView();
    }
}

//
// // GRASP/ Controller // Facade
//
// export class Controller {
//     #view
//     #model
//
//     constructor(view, model) {
//         this.#view = view
//         this.#model = model
//         this.#view.controller = this
//
//         this.#model.subscribe(() => {
//             this.#view.render()
//         })
//     }
//
//     async getViewModel() { /* (3) */
//         const status = await this.#model.getStatus()
//         const settings = await this.#model.getSettings()
//         const googlePosition = await this.#model.getGooglePosition()
//
//         return {
//             status,
//             settings,
//             googlePosition
//         }
//     }
//
//     async init() {
//         await this.#view.render() /* (2) */
//     }
//
//     async startGame() {
//         await this.#model.start()
//
//         await this.#view.render()
//     }
// }
//

// export class Controller {
//     #view
//     #model
//
//     constructor(view, model) {
//         this.#view = view
//         this.#model = model
//         this.#view.controller = this
//
//         this.#view.onIncrement = () => this.increment()
//     }
//
//     async init() {
//         this.#model.addEventListener(async () => {
//             await this.#refreshUI()
//         })
//
//         this.#model.addEventListener(async () => {
//             console.log('thanks model, i know about your changes')
//         })
//
//         await this.#model.start()
//
//
//         await this.#refreshUI()
//     }
//
//     async #refreshUI() {
//         const viewModelDTO = await this.mapModelToViewModelDTO()
//
//         this.#view.render(viewModelDTO)
//     }
//
//     async mapModelToViewModelDTO() {
//         return {
//             value: this.#model.count
//         }
//     }
//
//     async increment() {
//         this.#model.increment()
//     }
// }