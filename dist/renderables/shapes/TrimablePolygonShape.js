import { Shape } from "./Shape";
import { TrimablePolygonGeometry } from "../geometries/mod";
export class TrimablePolygonShape extends TrimablePolygonGeometry {
    fill = null;
    stroke = null;
    shadow = null;
    opacity = 1;
    constructor(points, closed, trimStart, trimEnd, trimOffset) {
        super(points, closed, trimStart, trimEnd, trimOffset);
    }
    render(renderingLayer) {
        Shape.renderObject(renderingLayer, this, this, this);
    }
    renderGizmo(renderingLayer) {
        Shape.renderGizmo(renderingLayer, this);
    }
}
