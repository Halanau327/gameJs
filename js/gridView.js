export class GridView {
    #tableEl;

    constructor(tableEl) {
        this.#tableEl = tableEl;
    }

    render(viewModel) {
        const gridSize = viewModel.settings.gridSize;
        const googlePosition = viewModel.googlePosition;
        const player1Position = viewModel.player1Position;
        const player2Position = viewModel.player2Position;

        // Получаем все строки таблицы
        const rows = this.#tableEl.querySelectorAll('tr');

        // Проходим по каждой строке и каждой ячейке
        for (let y = 0; y < gridSize.rows; y++) {
            const rowEl = rows[y];
            const cells = rowEl.querySelectorAll('td');

            for (let x = 0; x < gridSize.columns; x++) {
                const cellEl = cells[x];

                cellEl.innerHTML = '';

                if (googlePosition.x === x && googlePosition.y === y) {
                    const imgEl = document.createElement('img');
                    imgEl.src = 'img/icons/googleIcon.svg';
                    imgEl.alt = 'googleIcon';
                    cellEl.appendChild(imgEl);
                } else if (player1Position.x === x && player1Position.y === y) {
                    const imgEl = document.createElement('img');
                    imgEl.src = 'img/icons/man01.svg';
                    imgEl.alt = 'man';
                    cellEl.appendChild(imgEl);
                } else if (player2Position.x === x && player2Position.y === y) {
                    const imgEl = document.createElement('img');
                    imgEl.src = 'img/icons/man02.svg';
                    imgEl.alt = 'man';
                    cellEl.appendChild(imgEl);
                }
            }
        }
    }
}



        // this.tableEl.innerHTML = ''
        // for (let y = 0; y < gridSize.columns; y++) {
        //     const rowEl = document.createElement('tr')
        //     for (let x = 0; x < gridSize.rows; x++) {
        //         const cellEl = document.createElement('td')
        //         cellEl.classList.add('cell')
        //
        //         if (googlePosition.x === x && googlePosition.y === y) {
        //             const imgEl = document.createElement('img')
        //             imgEl.src = 'img/icons/googleIcon.svg'
        //             imgEl.alt = 'googleIcon'
        //             cellEl.appendChild(imgEl)
        //         } else {
        //             // Добавляем пустую ячейку
        //             cellEl.innerHTML = ''
        //         }
        //         rowEl.append(cellEl)
        //     }
        //     this.tableEl.appendChild(rowEl);
        // }
