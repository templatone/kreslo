import { Gradient } from "./Gradient";
import { type IBoundingBox } from "../renderables/IBoundingBox";
import { type IRenderingLayer } from "../core/RenderingLayer";
export declare class LinearGradient extends Gradient {
    computeStyle(renderingLayer: IRenderingLayer, boundingBox: IBoundingBox): CanvasGradient;
}
