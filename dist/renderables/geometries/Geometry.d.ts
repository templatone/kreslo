import { Transform } from "../../properties/mod";
import { type IBoundingBox } from "../IBoundingBox";
import { type IGeometry } from "./IGeometry";
import { type IRenderingLayer } from "../../core/mod";
declare type DrawWithoutMatrixManipulationType = {
    (ctx: CanvasRenderingContext2D, pxs: number, transform: Transform): void;
};
declare type GetBoundingBoxType = {
    (transform: Transform): IBoundingBox;
};
export declare abstract class Geometry implements IGeometry {
    transform: Transform;
    private _drawWithoutMatrixManipulation;
    private _getBoundingBox;
    constructor(draw: DrawWithoutMatrixManipulationType, getBoundingBox: GetBoundingBoxType);
    contructMatrix(renderingLayer: IRenderingLayer): void;
    destructMatrix(renderingLayer: IRenderingLayer): void;
    drawWithoutMatrixManipulation(renderingLayer: IRenderingLayer): void;
    draw(renderingLayer: IRenderingLayer): void;
    getBoundingBox(renderingLayer: IRenderingLayer): IBoundingBox;
}
export {};
