import { IBoundingBox } from "./IBoundingBox.js";
import { IGeometry } from "./IGeometry.js";
import { IRenderingLayer } from "../core/RenderingLayer.js";
import { Transform } from "../properties/Transform.js";


type drawWithoutMatrixManipulationType = {
    (ctx: CanvasRenderingContext2D, pxs: number, transform: Transform): void
};

type getBoundingBoxType = {
    (transform: Transform): IBoundingBox
}


export abstract class Geometry implements IGeometry {

    transform: Transform = new Transform();

    private _drawWithoutMatrixManipulation: drawWithoutMatrixManipulationType;
    private _getBoundingBox: getBoundingBoxType;


    constructor(draw: drawWithoutMatrixManipulationType, getBoundingBox: getBoundingBoxType) {
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