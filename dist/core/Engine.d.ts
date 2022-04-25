import { Loop } from "../repeaters/Loop";
import { RenderingLayer } from "./RenderingLayer";
export declare class Engine extends RenderingLayer {
    readonly loop: Loop;
    constructor(canvas: HTMLCanvasElement, width: number, height: number, pixelScale?: number, renderingSettings?: CanvasRenderingContext2DSettings);
}
