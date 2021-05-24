import { IBoundingBox } from "../renderables/IBoundingBox.js";
import { IClonable } from "../core/IClonable.js";
import { IRenderingLayer } from "../core/RenderingLayer.js";
import { Style, EntryType_Style } from "../styles/Style.js";
export declare class Stroke extends Style implements IClonable<Stroke> {
    lineWidth: number;
    lineJoin: CanvasLineJoin;
    lineCap: CanvasLineCap;
    lineDashOffset: number;
    miterLimit: number;
    constructor(style?: EntryType_Style, lineWidth?: number, lineJoin?: CanvasLineJoin, lineCap?: CanvasLineCap, lineDashOffset?: number, miterLimit?: number);
    apply(renderingLayer: IRenderingLayer, boundingBox: IBoundingBox): void;
    clone(): Stroke;
    static clear(renderingLayer: IRenderingLayer): void;
}
