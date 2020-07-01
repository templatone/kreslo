import { Engine } from "../../Engine.js";
import { RectangleShape } from "../../renderables/RectangleShape.js";
import { Vector } from "../../units/Vector.js";
import { Fill } from "../../properties/Fill.js";
import { Shadow } from "../../properties/Shadow.js";
import { EllipseShape } from "../../renderables/EllipseShape.js";
import { Color } from "../../styles/Color.js";


const canvasEl = document.getElementById('canvas')! as HTMLCanvasElement;
const engine = new Engine(canvasEl, 800, 600);
// engine.debuggerBar.enable();


const rectangle = new RectangleShape(200, 160);
rectangle.transform.position.x = 100;
rectangle.transform.position.y = 100;
rectangle.fill = new Fill(Color.green());
rectangle.shadow = new Shadow(Color.black(), new Vector(16, 16), 32);

const circle = new EllipseShape(180, 180);
circle.transform.position.x = 200;
circle.transform.position.y = 200;
circle.fill = new Fill(Color.red());


engine.loop.addUpdateCallback(() => {
    engine.clear();

    circle.render(engine);
    rectangle.render(engine);
})

engine.loop.run();