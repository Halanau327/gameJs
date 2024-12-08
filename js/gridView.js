export class GridView {

    constructor(tableEl) {
        this.tableEl = tableEl;
    }

    render(viewModel) {
        const gridSize = viewModel.settings.gridSize
        const googlePosition = viewModel.googlePosition

        this.tableEl.innerHTML = ''

        for (let y = 0; y < gridSize.columns; y++) {
            const rowEl = document.createElement('tr')
            for (let x = 0; x < gridSize.rows; x++) {
                const cellEl = document.createElement('td')
                cellEl.classList.add('cell')

                if (googlePosition.x === x && googlePosition.y === y) {
                    const imgEl = document.createElement('img')
                    imgEl.src = 'img/icons/googleIcon.svg'
                    imgEl.alt = 'googleIcon'
                    cellEl.appendChild(imgEl)
                } else {
                    // Добавляем пустую ячейку
                    cellEl.innerHTML = ''
                }
                rowEl.append(cellEl)
            }
            this.tableEl.appendChild(rowEl);
        }
    }
}