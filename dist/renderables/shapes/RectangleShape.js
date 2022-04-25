import { RectangleGeometry } from "../geometries/mod";
import { Shape } from "./Shape";
export class RectangleShape extends RectangleGeometry {
    fill = null;
    stroke = null;
    shadow = null;
    opacity = 1;
    constructor(width, height) {
        super(width, height);
    }
    render(renderingLayer) {
        Shape.renderObject(renderingLayer, this, this, this);
    }
    renderGizmo(renderingLayer) {
        Shape.renderGizmo(renderingLayer, this);
    }
    clone() {
        const rectangle = new RectangleShape(this.width, this.height);
        rectangle.fill = this.fill?.clone() ?? null;
        rectangle.stroke = this.stroke?.clone() ?? null;
        rectangle.shadow = this.shadow?.clone() ?? null;
        rectangle.opacity = this.opacity;
        return rectangle;
    }
}
