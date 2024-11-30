export class View {
    #rootElement
    // #controller
    #onIncrementHandler

    constructor(elementId) {
        this.#rootElement = document.getElementById(elementId)
    }

    // set controller(value) {
    //     this.#controller = value
    // }

    render(viewModelDTO) {
        this.#rootElement.innerHTML = ''

        this.#rootElement.append(viewModelDTO.value)

        const buttonElement = document.createElement('button')

        buttonElement.append('increment')


        buttonElement.addEventListener('click', async () => {
            await this.#onIncrementHandler()
        })


        this.#rootElement.append(buttonElement)


    }

    set onIncrement(callback) {
        this.#onIncrementHandler = callback
    }

}