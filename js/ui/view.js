import {GAME_STATUSES} from "../game.js";
import {GridView} from "../gridView.js";

export class View {
    #container
    #gridView;
    #startButton;
    #resultContainer;
    #modal;
    #modalTitle;
    #modalText;
    #modalResultCatch;
    #modalResultMiss;
    #playAgainButton;
    #resultCatch;
    #resultMiss;
    #settings;
    #startGameCallback;
    #playAgainCallback;

    constructor(containerSelector) {
        this.#container = document.querySelector(containerSelector);
        this.#gridView = new GridView(this.#container.querySelector('.table'))
        this.#startButton = document.querySelector('.main-button')
        this.#resultContainer = document.querySelector('.result-container')
        this.#modal = this.#container.querySelector('.modal');
        this.#modalTitle = this.#modal.querySelector('.title-modal');
        this.#modalText = this.#modal.querySelector('.text-modal');
        this.#modalResultCatch = this.#modal.querySelector('.modal-result .result:nth-child(1)');
        this.#modalResultMiss = this.#modal.querySelector('.modal-result .result:nth-child(2)');
        this.#playAgainButton = this.#modal.querySelector('.button');
        this.#resultCatch = this.#resultContainer.querySelector('.result-block:nth-child(1) .result');
        this.#resultMiss = this.#resultContainer.querySelector('.result-block:nth-child(2) .result');
        this.#settings = {
            gridSize: this.#container.querySelector('#gridSize'),
            pointsToWin: this.#container.querySelector('#pointsToWin'),
            pointsToLose: this.#container.querySelector('#pointsToLose')
        };
        this.bindEvents();
    }

    bindEvents() {
        this.#startButton.addEventListener('click', () => {


            const gridSize = this.#settings.gridSize.value.split('x').map(Number);

            console.log('Grid size array:', gridSize); // Отладочный выво

            const pointsToWin = parseInt(this.#settings.pointsToWin.value, 10);
            const pointsToLose = parseInt(this.#settings.pointsToLose.value, 10);


            this.#startGameCallback({
                gridSize: { rows: gridSize[1], columns: gridSize[0] },
                pointsToWin,
                pointsToLose
            });
        });

        this.#playAgainButton.addEventListener('click', () => {
            this.#playAgainCallback();
        });
    }

    onStartGame(callback) {
        this.#startGameCallback = callback;
    }

    onPlayAgain(callback) {
        this.#playAgainCallback = callback;
    }

    updateGrid(viewModel) {
        this.#gridView.render(viewModel);
    }

    showGrid() {
        this.#container.querySelector('.table').classList.add('visible');
    }

    hideGrid() {
        this.#container.querySelector('.table').classList.remove('visible');
    }


    updateScore(player1Score, player2Score) {
        this.#resultCatch.textContent = player1Score;
        this.#resultMiss.textContent = player2Score;
    }

    showModal(title, text, catchCount, missCount) {
        this.#modalTitle.textContent = title;
        this.#modalText.textContent = text;
        this.#modalResultCatch.textContent = catchCount;
        this.#modalResultMiss.textContent = missCount;
        this.#modal.style.display = 'block';
    }

    hideModal() {
        this.#modal.style.display = 'none';
    }


}





