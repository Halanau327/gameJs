export class Counter {
    #count

    constructor() {
        this.#count = 0
    }

    get count() {
        return this.#count
    }

    async increment() {
        this.#count++
    }
}