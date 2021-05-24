import { Loop } from "../repeaters/Loop.js";
import { RenderingLayer, UpdateStyleSizeCallback } from "./RenderingLayer.js";
export declare class Engine extends RenderingLayer {
    readonly loop: Loop;
    constructor(canvas: HTMLCanvasElement, width: number, height: number, pixelScale?: number, updateStyleSizeCallback?: UpdateStyleSizeCallback | null);
}
