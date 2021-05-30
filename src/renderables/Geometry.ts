import type { IBoundingBox } from "./IBoundingBox.js";
import type { IGeometry } from "./IGeometry.js";
import type { IRenderingLayer } from "../core/RenderingLayer.js";
import { Transform } from "../properties/Transform.js";


type DrawWithoutMatrixManipulationType = {
    (ctx: CanvasRenderingContext2D, pxs: number, transform: Transform): void
};

type GetBoundingBoxType = {
    (transform: Transform): IBoundingBox
}


export abstract class Geometry implements IGeometry {

    transform: Transform = new Transform();

    private _drawWithoutMatrixManipulation: DrawWithoutMatrixManipulationType;
    private _getBoundingBox: GetBoundingBoxType;


    constructor(draw: DrawWithoutMatrixManipulationType, getBoundingBox: GetBoundingBoxType) {
        this._drawWithoutMatrixManipulation = draw;
        this._getBoundingBox = getBoundingBox;
    }


    contructMatrix(renderingLayer: IRenderingLayer) {
        const t = this.transform;

        renderingLayer.setMatrixToTransform(t);
    }


    destructMatrix(renderingLayer: IRenderingLayer) {
        renderingLayer.resetMatrix();
    }


    drawWithoutMatrixManipulation(renderingLayer: IRenderingLayer) {
        const ctx = renderingLayer.getRenderingContext();
        const pxs = renderingLayer.pixelScale;

        const t = this.transform;

        this._drawWithoutMatrixManipulation(ctx, pxs, t);
    }


    draw(renderingLayer: IRenderingLayer) {
        this.contructMatrix(renderingLayer);
        this.drawWithoutMatrixManipulation(renderingLayer);
        this.destructMatrix(renderingLayer);
    }


    getBoundingBox(renderingLayer: IRenderingLayer): IBoundingBox {
        return this._getBoundingBox(this.transform);
    }

}