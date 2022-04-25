import { Fill } from "../../properties/Fill";
import { Gizmo } from "../../debugger/Gizmo";
import { Numbers } from "@templatone/utils";
import { Shadow } from "../../properties/Shadow";
import { Stroke } from "../../properties/Stroke";
import { Transform } from "../../properties/Transform";
import { Vector } from "../../units/Vector";
import { type GetBoundingBoxCallbackType, IShape } from "./IShape";
import { type IGeometry } from "../geometries/IGeometry";
import { type IRenderable } from "../IRenderable";
import { type IRenderingLayer } from "../../core/RenderingLayer";


export class Shape {

    geometry: IGeometry;
    private _getBoundingBox: GetBoundingBoxCallbackType;

    transform: Transform = new Transform();

    fill: Fill | null = null;
    stroke: Stroke | null = null;
    shadow: Shadow | null = null;

    opacity: number = 1;


    constructor(geometry: IGeometry, getBoundingBox: GetBoundingBoxCallbackType) {
        this.geometry = geometry;
        this._getBoundingBox = getBoundingBox;
    }


    render(renderingLayer: IRenderingLayer) {
        Shape.renderObject(renderingLayer, this.geometry, this, this);
    }


    renderGizmo(renderingLayer: IRenderingLayer) {
        Shape.renderGizmo(renderingLayer, this.geometry);
    }


    getBoundingBox(renderingLayer: IRenderingLayer) {
        return this._getBoundingBox(renderingLayer)
    }


    static applyStyles(renderingLayer: IRenderingLayer, shape: IShape): void {
        const ctx = renderingLayer.getRenderingContext();

        ctx.globalAlpha = Numbers.limit(shape.opacity, 0, 1);

        if (shape.shadow) {
            shape.shadow.apply(renderingLayer, shape.getBoundingBox(renderingLayer));
        } else {
            Shadow.clear(renderingLayer);
        }

        if (shape.fill) {
            shape.fill.apply(renderingLayer, shape.getBoundingBox(renderingLayer));
            ctx.fill();
        } else {
            Fill.clear(renderingLayer);
        }

        if (shape.stroke) {
            shape.stroke.apply(renderingLayer, shape.getBoundingBox(renderingLayer));
            ctx.stroke();
        } else {
            Stroke.clear(renderingLayer);
        }

        ctx.globalAlpha = 1;
    }


    static renderObject(renderingLayer: IRenderingLayer, geometry: IGeometry, renderable: IRenderable, shape: IShape): void {
        const ctx = renderingLayer.getRenderingContext();

        ctx.beginPath();
        geometry.contructMatrix(renderingLayer);
        geometry.drawWithoutMatrixManipulation(renderingLayer);

        Shape.applyStyles(renderingLayer, shape);

        geometry.destructMatrix(renderingLayer);
        ctx.closePath();

        if (renderingLayer.gizmoVisibility && renderable.renderGizmo) renderable.renderGizmo(renderingLayer);
    }


    static renderGizmo(renderingLayer: IRenderingLayer, geometry: IGeometry) {
        renderingLayer.setMatrixToTransform(geometry.transform);

        Gizmo.origin(renderingLayer, Vector.Zero, Gizmo.shapeColor);

        renderingLayer.resetMatrix();
    }

}