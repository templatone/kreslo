import { RoundedRectangleGeometry } from "../geometries/mod";
import { Shape } from "./Shape";
export class RoundedRectangleShape extends RoundedRectangleGeometry {
    fill = null;
    stroke = null;
    shadow = null;
    opacity = 1;
    constructor(width, height, ...radius) {
        super(width, height, ...radius);
    }
    render(renderingLayer) {
        Shape.renderObject(renderingLayer, this, this, this);
    }
    renderGizmo(renderingLayer) {
        Shape.renderGizmo(renderingLayer, this);
    }
    clone() {
        const topLeftRadius = { x: this.topLeftRadius.x, y: this.topLeftRadius.y };
        const topRightRadius = { x: this.topRightRadius.x, y: this.topRightRadius.y };
        const bottomRightRadius = { x: this.bottomRightRadius.x, y: this.bottomRightRadius.y };
        const bottomLeftRadius = { x: this.bottomLeftRadius.x, y: this.bottomLeftRadius.y };
        const shape = new RoundedRectangleShape(this.width, this.height, topLeftRadius, topRightRadius, bottomRightRadius, bottomLeftRadius);
        shape.fill = this.fill?.clone() ?? null;
        shape.stroke = this.stroke?.clone() ?? null;
        shape.shadow = this.shadow?.clone() ?? null;
        shape.opacity = this.opacity;
        return shape;
    }
}
