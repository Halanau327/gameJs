export class Controller {
    #view
    #model

    constructor(view, model) {
        this.#view = view
        this.#model = model
        this.#view.controller = this

        this.#view.onIncrement = () => this.increment()
    }

    async init() {
        await this.#refreshUI()
    }

    async #refreshUI() {
        const viewModelDTO = await this.mapModelToViewModelDTO()

        this.#view.render(viewModelDTO)
    }

    async mapModelToViewModelDTO() {
        return {
            value: this.#model.count
        }
    }

    async increment() {
        await this.#model.increment()
        await this.#refreshUI()
    }
}