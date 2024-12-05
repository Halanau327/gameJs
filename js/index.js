// entry endpoint
import {View} from "./ui/view.js";
import {Controller} from "./ui/controller.js";
import {Game} from "./game.js";
import {NumberMagicUtil} from "./number-magic-util.js";

// const model = new Counter()

const numberUtil = new NumberMagicUtil()

const game = new Game(numberUtil)

await game.setSettings({
    gridSize: {
        rows: 2,
        columns: 2
    }
})


const view = new View("app")

const controller = new Controller(view, game)


controller.init()