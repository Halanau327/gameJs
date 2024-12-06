// GRASP/ Controller // Facade

export class Controller {
    #view
    #model

    constructor(view, model) {
        this.#view = view
        this.#model = model

        this.#view.controller = this
    }

    async getViewModel() {
        const status = await this.#model.getStatus()
        const settings = await this.#model.getSettings()
        const googlePosition = await this.#model.getGooglePosition()

        let viewModel = {
            status,
            settings,
            googlePosition: {...googlePosition}
        }

        return viewModel
    }

    async init() {
        // const viewModel = await this.getViewModel()
        await this.#view.render()
    }

    async startGame() {
        await this.#model.start()
        await this.#view.render()
    }
}


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