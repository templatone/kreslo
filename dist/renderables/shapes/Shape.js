import { Fill } from "../../properties/Fill";
import { Gizmo } from "../../debugger/Gizmo";
import { Numbers } from "@templatone/utils";
import { Shadow } from "../../properties/Shadow";
import { Stroke } from "../../properties/Stroke";
import { Transform } from "../../properties/Transform";
import { Vector } from "../../units/Vector";
export class Shape {
    geometry;
    _getBoundingBox;
    transform = new Transform();
    fill = null;
    stroke = null;
    shadow = null;
    opacity = 1;
    constructor(geometry, getBoundingBox) {
        this.geometry = geometry;
        this._getBoundingBox = getBoundingBox;
    }
    render(renderingLayer) {
        Shape.renderObject(renderingLayer, this.geometry, this, this);
    }
    renderGizmo(renderingLayer) {
        Shape.renderGizmo(renderingLayer, this.geometry);
    }
    getBoundingBox(renderingLayer) {
        return this._getBoundingBox(renderingLayer);
    }
    static applyStyles(renderingLayer, shape) {
        const ctx = renderingLayer.getRenderingContext();
        ctx.globalAlpha = Numbers.limit(shape.opacity, 0, 1);
        if (shape.shadow) {
            shape.shadow.apply(renderingLayer, shape.getBoundingBox(renderingLayer));
        }
        else {
            Shadow.clear(renderingLayer);
        }
        if (shape.fill) {
            shape.fill.apply(renderingLayer, shape.getBoundingBox(renderingLayer));
            ctx.fill();
        }
        else {
            Fill.clear(renderingLayer);
        }
        if (shape.stroke) {
            shape.stroke.apply(renderingLayer, shape.getBoundingBox(renderingLayer));
            ctx.stroke();
        }
        else {
            Stroke.clear(renderingLayer);
        }
        ctx.globalAlpha = 1;
    }
    static renderObject(renderingLayer, geometry, renderable, shape) {
        const ctx = renderingLayer.getRenderingContext();
        ctx.beginPath();
        geometry.contructMatrix(renderingLayer);
        geometry.drawWithoutMatrixManipulation(renderingLayer);
        Shape.applyStyles(renderingLayer, shape);
        geometry.destructMatrix(renderingLayer);
        ctx.closePath();
        if (renderingLayer.gizmoVisibility && renderable.renderGizmo)
            renderable.renderGizmo(renderingLayer);
    }
    static renderGizmo(renderingLayer, geometry) {
        renderingLayer.setMatrixToTransform(geometry.transform);
        Gizmo.origin(renderingLayer, Vector.Zero, Gizmo.shapeColor);
        renderingLayer.resetMatrix();
    }
}
