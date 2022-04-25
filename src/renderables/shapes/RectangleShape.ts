import { RectangleGeometry } from "../geometries/mod";
import { Shape } from "./Shape";
import { type Fill } from "../../properties/Fill";
import { type IClonable } from "../../core/IClonable";
import { type IRenderable } from "../IRenderable";
import { type IRenderingLayer } from "../../core/RenderingLayer";
import { type IShape } from "./IShape";
import { type Shadow } from "../../properties/Shadow";
import { type Stroke } from "../../properties/Stroke";


export class RectangleShape extends RectangleGeometry implements IRenderable, IShape, IClonable<RectangleShape> {

    fill: Fill | null = null;
    stroke: Stroke | null = null;
    shadow: Shadow | null = null;

    opacity: number = 1;

    constructor(width: number, height: number) {
        super(width, height);
    }


    render(renderingLayer: IRenderingLayer) {
        Shape.renderObject(renderingLayer, this, this, this);
    }


    renderGizmo(renderingLayer: IRenderingLayer) {
        Shape.renderGizmo(renderingLayer, this);
    }


    clone(): RectangleShape {
        const rectangle = new RectangleShape(this.width, this.height);

        rectangle.fill = this.fill?.clone() ?? null;
        rectangle.stroke = this.stroke?.clone() ?? null;
        rectangle.shadow = this.shadow?.clone() ?? null;
        rectangle.opacity = this.opacity;

        return rectangle;
    }
}