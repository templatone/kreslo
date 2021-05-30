import type { IBoundingBox } from "../renderables/IBoundingBox.js";
import type { IClonable } from "../core/IClonable.js";
import { IColorRGBA } from "../styles/Color.js";
import type { IRenderingLayer } from "../core/RenderingLayer.js";
import { Vector } from "../units/Vector.js";
export declare class Shadow implements IClonable<Shadow> {
    color: IColorRGBA;
    offset: Vector;
    blur: number;
    constructor(color: IColorRGBA, offset: Vector, blur: number);
    apply(renderingLayer: IRenderingLayer, boundingBox: IBoundingBox): void;
    clone(): Shadow;
    static clear(renderingLayer: IRenderingLayer): void;
}
