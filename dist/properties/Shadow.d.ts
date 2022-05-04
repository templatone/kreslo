import { type IColorRGBA } from "../styles/Color";
import { Vector, type VectorType } from "../units/Vector";
import { type IBoundingBox } from "../renderables/IBoundingBox";
import { type IClonable } from "../core/IClonable";
import { type IRenderingLayer } from "../core/RenderingLayer";
export declare class Shadow implements IClonable<Shadow> {
    color: IColorRGBA;
    offset: Vector;
    blur: number;
    constructor(color: IColorRGBA, offset: VectorType, blur: number);
    apply(renderingLayer: IRenderingLayer, boundingBox: IBoundingBox): void;
    clone(): Shadow;
    static clear(renderingLayer: IRenderingLayer): void;
}
