import { RectangleGeometry } from "./RectangleGeometry.js";
import { Helper } from "../Helper.js";
import { Vector } from "../../units/units.js";
import { Gizmo } from "../../debugger/Gizmo.js";
export class RectangleShape extends RectangleGeometry {
    constructor(width, height) {
        super(width, height);
        this.fill = null;
        this.stroke = null;
        this.shadow = null;
        this.opacity = 1;
    }
    render(renderingLayer) {
        Helper.render(renderingLayer, this, this, this);
    }
    renderGizmos(renderingLayer) {
        renderingLayer.setMatrixToTransform(this.transform);
        Gizmo.origin(renderingLayer, Vector.zero(), Gizmo.shapeColor);
        renderingLayer.resetMatrix();
    }
}
