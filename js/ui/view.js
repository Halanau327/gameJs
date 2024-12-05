import {GAME_STATUSES} from "../game.js";

export class GridView {
    render(settings) {
        const gridEl = document.createElement('table')

        for (let y = 0; y < settings.gridSize.columns; y++) {
            const rowEl = document.createElement('tr')
            for (let x = 0; x < settings.gridSize.rows; x++) {
                const cellEl = document.createElement('td')
                cellEl.append(x + ',' + y);
                rowEl.append(cellEl)
            }
            gridEl.append(rowEl)
        }

        return gridEl
    }
}

export class View {
    #rootEl
    #gridView
    #controller

    constructor(rootId) {
        this.#rootEl = document.getElementById(rootId)
        // GRASP / Information Expert, Creator
        this.#gridView = new GridView()
    }

    set controller (controller) {
       this.#controller = controller
    }

    async render() {
        const viewModel = await this.#controller.getViewModel()

        this.#rootEl.innerHTML = ''
        this.#rootEl.append(this.renderStartButton())
        this.#rootEl.append(this.renderStatus(viewModel.status))

        if (viewModel.status === GAME_STATUSES.IN_PROGRESS) {
            this.#rootEl.append(this.#gridView.render(viewModel.settings))
        }
    }

    renderStartButton() {
        const button = document.createElement('button')
        button.append('Start')

        button.addEventListener('click', async () => {
            await this.#controller.startGame()
        })

        return button
    }

    renderStatus(status) {
        const statusEl = document.createElement('div')
        statusEl.append('Status: ' + status)
        return statusEl
    }

    renderGrid(gridSize) {

    }
}


// export class View {
//     #rootElement
//     #onIncrementHandler
//
//     constructor(elementId) {
//         this.#rootElement = document.getElementById(elementId)
//     }
//
//     render(viewModelDTO) {
//         this.#rootElement.innerHTML = ''
//
//         this.#rootElement.append(viewModelDTO.value)
//
//         const buttonElement = document.createElement('button')
//
//         buttonElement.append('increment')
//
//
//         buttonElement.addEventListener('click', async () => {
//             await this.#onIncrementHandler()
//         })
//
//
//         this.#rootElement.append(buttonElement)
//
//
//     }
//
//     set onIncrement(callback) {
//         this.#onIncrementHandler = callback
//     }
//
// }