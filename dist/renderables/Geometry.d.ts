import { IBoundingBox } from "./IBoundingBox.js";
import { IGeometry } from "./IGeometry.js";
import { IRenderingLayer } from "../core/RenderingLayer.js";
import { Transform } from "../properties/Transform.js";
declare type drawWithoutMatrixManipulationType = {
    (ctx: CanvasRenderingContext2D, pxs: number, transform: Transform): void;
};
declare type getBoundingBoxType = {
    (transform: Transform): IBoundingBox;
};
export declare abstract class Geometry implements IGeometry {
    transform: Transform;
    private _drawWithoutMatrixManipulation;
    private _getBoundingBox;
    constructor(draw: drawWithoutMatrixManipulationType, getBoundingBox: getBoundingBoxType);
    contructMatrix(renderingLayer: IRenderingLayer): void;
    destructMatrix(renderingLayer: IRenderingLayer): void;
    drawWithoutMatrixManipulation(renderingLayer: IRenderingLayer): void;
    draw(renderingLayer: IRenderingLayer): void;
    getBoundingBox(renderingLayer: IRenderingLayer): IBoundingBox;
}
export {};
