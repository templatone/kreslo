import { BezierGeometry } from "../geometries/BezierGeometry";
import { Shape } from "./Shape";
export class BezierShape extends BezierGeometry {
    fill = null;
    stroke = null;
    shadow = null;
    opacity = 1;
    constructor(...points) {
        super(...points);
    }
    render(renderingLayer) {
        Shape.renderObject(renderingLayer, this, this, this);
    }
    renderGizmo(renderingLayer) {
        Shape.renderGizmo(renderingLayer, this);
    }
}
