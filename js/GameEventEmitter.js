//Publisher/Producer/Observable
//EventEmitter NodeJS - читать

export class GameEventEmitter {
    #listeners

    constructor() {
        this.#listeners = []
    }

    //callback = subscriber/observer/handler/consumer
    on(callback) {
        this.#listeners.push(callback)
    }

    emit(data = null) {
        if (this.#listeners) {
            this.#listeners.forEach(callback => callback(data))
        }
    }
}