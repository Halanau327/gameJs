export class Counter {
    #count
    #observers = []

    constructor() {
        this.#count = 0
    }

    get count() {
        return this.#count
    }

    async increment() {
        this.#count++
        this.#observers.forEach(o => o())
    }

    async start() {
        setInterval(() => {
            this.#count--
            this.#observers.forEach(o => o())
        }, 1000)
    }

    addEventListener(subscriber) {
        this.#observers.push(subscriber)
    }
}