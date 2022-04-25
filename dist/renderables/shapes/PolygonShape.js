import { PolygonGeometry } from "../geometries/mod";
import { Shape } from "./Shape";
export class PolygonShape extends PolygonGeometry {
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
