// entry endpoint
import {View} from "./ui/view.js";
import {Controller} from "./ui/controller.js";
import {Game} from "./game.js";
import {NumberMagicUtil} from "./number-magic-util.js";
import {GameEventEmitter} from "./GameEventEmitter.js";

const eventEmitter = new GameEventEmitter()
const numberUtil = new NumberMagicUtil()

const game = new Game(numberUtil, eventEmitter)

await game.setSettings({
    gridSize: {
        rows: 5,
        columns: 5
    }
})


const view = new View("app")

const controller = new Controller(view, game)



controller.init() /* (1) точка входа */