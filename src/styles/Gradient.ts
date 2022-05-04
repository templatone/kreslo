import { type IBoundingBox } from "../renderables/IBoundingBox";
import { type IColorRGBA } from "./Color";
import { type IRenderingLayer } from "../core/RenderingLayer";
import { type IStyle } from "./Style";
import { VectorType, Vector } from "../units/mod";


export abstract class Gradient implements IGradient, IStyle {
    start: Vector;
    end: Vector;

    steps: IGradientStep[] = [];

    constructor(start: VectorType, end: VectorType, steps: IGradientStep[]) {
        this.start = new Vector(start);
        this.end = new Vector(end);
        this.steps = steps;
    }


    computeStyle(renderingLayer: IRenderingLayer, boundingBox: IBoundingBox): string | CanvasGradient | CanvasPattern {
        throw new Error("Mehod `getStyle` is not implemented.");
    }
}


export interface IGradient {
    start: Vector;
    end: Vector;

    steps: IGradientStep[];
}


export interface IGradientStep {
    offset: number,
    color: IColorRGBA,
}