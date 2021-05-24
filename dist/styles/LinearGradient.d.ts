import { Gradient } from "./Gradient.js";
import { IBoundingBox } from "../renderables/IBoundingBox.js";
import { IRenderingLayer } from "../core/RenderingLayer.js";
export declare class LinearGradient extends Gradient {
    computeStyle(renderingLayer: IRenderingLayer, boundingBox: IBoundingBox): CanvasGradient;
}
