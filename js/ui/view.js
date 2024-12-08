import {GAME_STATUSES} from "../game.js";
import {GridView} from "../gridView.js";

export class View {
    #rootEl
    #gridView
    #controller

    constructor(rootId) {
        this.#rootEl = document.getElementById(rootId)
        // GRASP / Information Expert, Creator
        const tableElement = document.querySelector('.table')
        this.#gridView = new GridView(tableElement)
    }

    set controller (controller) {
       this.#controller = controller
    }

    async render() {
        const viewModel = await this.#controller.getViewModel()

        this.#rootEl.innerHTML = ''
        this.#rootEl.append(this.renderStartButton())
        // this.#rootEl.append(this.renderStatus(viewModel.status))

        if (viewModel.status === GAME_STATUSES.IN_PROGRESS) {
            this.#rootEl.append(this.#gridView.render(viewModel))
        }
    }

    renderStartButton() {
        const button = document.createElement('button')
        button.classList.add('.main-button')

        button.addEventListener('click', async () => {
            await this.#controller.startGame()
        })

        return button
    }

    // renderStatus(status) {
    //     const statusEl = document.createElement('div')
    //     statusEl.append('Status: ' + status)
    //     return statusEl
    // }
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