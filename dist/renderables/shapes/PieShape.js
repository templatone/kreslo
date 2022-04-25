import { PieGeometry } from "../geometries/PieGeometry";
import { Shape } from "./Shape";
export class PieShape extends PieGeometry {
    fill = null;
    stroke = null;
    shadow = null;
    opacity = 1;
    constructor(width, height, startAngle, endAngle, innerRadius) {
        super(width, height, startAngle, endAngle, innerRadius);
    }
    render(renderingLayer) {
        Shape.renderObject(renderingLayer, this, this, this);
    }
    renderGizmo(renderingLayer) {
        Shape.renderGizmo(renderingLayer, this);
    }
}
