import { type IRenderingLayer } from "../core/RenderingLayer";
export interface IBlueprint {
    contructMatrix(renderingLayer: IRenderingLayer): void;
    destructMatrix(renderingLayer: IRenderingLayer): void;
    drawWithoutMatrixManipulation(renderingLayer: IRenderingLayer): void;
    draw(renderingLayer: IRenderingLayer): void;
}
