import { Gizmo } from "../debugger/Gizmo";
import { Transform } from "../properties/Transform";
import { Vector } from "../units/Vector";
import { type IBoundingBox } from "./IBoundingBox";
import { type IClonable } from "../core/IClonable";
import { type IObject } from "./IObject";
import { type IRenderingLayer } from "../core/RenderingLayer";


export class NullObject implements IObject, IClonable<NullObject> {

    transform: Transform = new Transform();


    constructor() { }


    getBoundingBox(renderingLayer: IRenderingLayer): IBoundingBox {
        return {
            origin: this.transform.origin.clone(),
            size: Vector.Zero,
        }
    }


    render(renderingLayer: IRenderingLayer) {
        if (renderingLayer.gizmoVisibility && this.renderGizmos) this.renderGizmos(renderingLayer);
    }


    renderGizmos(renderingLayer: IRenderingLayer) {
        renderingLayer.setMatrixToTransform(this.transform);
        Gizmo.origin(renderingLayer, Vector.Zero, Gizmo.nullColor);
        renderingLayer.resetMatrix();
    }


    clone(): NullObject {
        const n = new NullObject();
        n.transform = this.transform.clone();

        return n;
    }
}