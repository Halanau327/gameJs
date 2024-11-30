// entry endpoint
import {View} from "./ui/view.js";
import {Controller} from "./ui/controller.js";
import {Counter} from "./ui/counter.js";

const model = new Counter()

const view = new View("app")

const controller = new Controller(view, model)

controller.init()