import { Game, GAME_STATUSES, MOVE_DIRECTIONS } from "./game.js";
import { NumberMagicUtil } from "./number-magic-util.js";
import { DEFAULT_SETTINGS, GRID_SIZES, POINTS_TO_WIN, POINTS_TO_LOSE } from "./settings.js";

document.getElementById('01').addEventListener('change', updateGridSizeOptions);
document.getElementById('02').addEventListener('change', updatePointsToWinOptions);
document.getElementById('03').addEventListener('change', updatePointsToLoseOptions);
document.querySelector('.main-button').addEventListener('click', startGame);

function updateGridSizeOptions() {
    const gridSizeSelect = document.getElementById('01');
    gridSizeSelect.innerHTML = GRID_SIZES.map(size => `<option value="${size.rows}x${size.columns}">${size.rows}x${size.columns}</option>`).join('');
}

function updatePointsToWinOptions() {
    const pointsToWinSelect = document.getElementById('02');
    pointsToWinSelect.innerHTML = POINTS_TO_WIN.map(points => `<option value="${points}">${points}</option>`).join('');
}

function updatePointsToLoseOptions() {
    const pointsToLoseSelect = document.getElementById('03');
    pointsToLoseSelect.innerHTML = POINTS_TO_LOSE.map(points => `<option value="${points}">${points}</option>`).join('');
}

async function startGame() {
    const gridSize = document.getElementById('01').value.split('x').map(Number);
    const pointsToWin = parseInt(document.getElementById('02').value);
    const pointsToLose = parseInt(document.getElementById('03').value);

    const settings = {
        gridSize: {
            rows: gridSize[0],
            columns: gridSize[1]
        },
        pointsToWin,
        pointsToLose,
        jumpInterval: DEFAULT_SETTINGS.jumpInterval
    };

    const numberUtil = new NumberMagicUtil();
    const game = new Game(numberUtil);

    await game.setSettings(settings);
    await game.start();

    // Здесь можно добавить логику для обработки движения игроков и обновления интерфейса
    updateGameUI(game);
}

function updateGameUI(game) {
    const table = document.querySelector('.table');
    const tbody = table.querySelector('tbody');
    tbody.innerHTML = '';

    const gridSize = game.settings.gridSize;
    for (let row = 0; row < gridSize.rows; row++) {
        const tr = document.createElement('tr');
        for (let col = 0; col < gridSize.columns; col++) {
            const td = document.createElement('td');
            td.classList.add('cell');
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }

    // Здесь можно добавить логику для обновления позиций игроков и Google на таблице
    updatePositions(game);
}

async function updatePositions(game) {
    const player1Position = await game.getPlayer1Position();
    const player2Position = await game.getPlayer2Position();
    const googlePosition = await game.getGooglePosition();

    const table = document.querySelector('.table');
    const cells = table.querySelectorAll('.cell');

    cells.forEach(cell => cell.innerHTML = '');

    cells[player1Position.y * game.settings.gridSize.columns + player1Position.x].innerHTML = '<img src="img/icons/man01.svg" alt="man">';
    cells[player2Position.y * game.settings.gridSize.columns + player2Position.x].innerHTML = '<img src="img/icons/man02.svg" alt="man">';
    cells[googlePosition.y * game.settings.gridSize.columns + googlePosition.x].innerHTML = '<img src="img/icons/googleIcon.svg" alt="googleIcon">';

    // Обновляем счет игроков
    document.querySelector('.result-block:nth-child(1) .result').textContent = game.player1Score;
    document.querySelector('.result-block:nth-child(2) .result').textContent = game.player2Score;

    // Проверка на завершение игры
    if (game.getStatus() === GAME_STATUSES.FINISHED) {
        showModal(game);
    }
}

function showModal(game) {
    const modal = document.querySelector('.modal');
    const modalTitle = modal.querySelector('.title-modal');
    const modalText = modal.querySelector('.text-modal');
    const modalResult = modal.querySelector('.modal-result');
    const modalButton = modal.querySelector('.button');

    if (game.player1Score >= game.settings.pointsToWin) {
        modalTitle.textContent = 'You Win!';
        modalText.textContent = 'Congratulations';
    } else if (game.player2Score >= game.settings.pointsToWin) {
        modalTitle.textContent = 'You Lose!';
        modalText.textContent = "You'll be lucky next time";
    }

    modalResult.innerHTML = `
        <div class="result-block">
            <span class="result-title">Catch:</span>
            <span class="result">${game.player1Score}</span>
        </div>
        <div class="result-block">
            <span class="result-title">Miss:</span>
            <span class="result">${game.player2Score}</span>
        </div>
    `;

    modalButton.addEventListener('click', () => {
        modal.style.display = 'none';
        startGame();
    });

    modal.style.display = 'block';
}

// Инициализация опций
updateGridSizeOptions();
updatePointsToWinOptions();
updatePointsToLoseOptions();