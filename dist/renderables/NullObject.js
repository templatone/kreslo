import { Gizmo } from "../debugger/Gizmo";
import { Transform } from "../properties/Transform";
import { Vector } from "../units/Vector";
export class NullObject {
    transform = new Transform();
    constructor() { }
    getBoundingBox(renderingLayer) {
        return {
            origin: this.transform.origin.clone(),
            size: Vector.Zero,
        };
    }
    render(renderingLayer) {
        if (renderingLayer.gizmoVisibility && this.renderGizmos)
            this.renderGizmos(renderingLayer);
    }
    renderGizmos(renderingLayer) {
        renderingLayer.setMatrixToTransform(this.transform);
        Gizmo.origin(renderingLayer, Vector.Zero, Gizmo.nullColor);
        renderingLayer.resetMatrix();
    }
    clone() {
        const n = new NullObject();
        n.transform = this.transform.clone();
        return n;
    }
}
