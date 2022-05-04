import { Transform } from "../../properties/mod";
import { type IBoundingBox } from "../IBoundingBox";
import { type IGeometry } from "./IGeometry";
import { type IRenderingLayer } from "../../core/mod";


type DrawWithoutMatrixManipulationType = {
    (ctx: CanvasRenderingContext2D, pxs: number, transform: Transform): void
};

type GetBoundingBoxType = {
    (transform: Transform): IBoundingBox
}


export abstract class Geometry implements IGeometry {

    transform: Transform = new Transform();

    #drawWithoutMatrixManipulation: DrawWithoutMatrixManipulationType;
    #getBoundingBox: GetBoundingBoxType;


    constructor(draw: DrawWithoutMatrixManipulationType, getBoundingBox: GetBoundingBoxType) {
        this.#drawWithoutMatrixManipulation = draw;
        this.#getBoundingBox = getBoundingBox;
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
        this.#drawWithoutMatrixManipulation(ctx, pxs, t);
    }


    draw(renderingLayer: IRenderingLayer) {
        this.contructMatrix(renderingLayer);
        this.drawWithoutMatrixManipulation(renderingLayer);
        this.destructMatrix(renderingLayer);
    }


    getBoundingBox(renderingLayer: IRenderingLayer): IBoundingBox {
        return this.#getBoundingBox(this.transform);
    }

}