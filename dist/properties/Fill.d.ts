import { Style, EntryStyleType } from "../styles/Style";
import { type IBoundingBox } from "../renderables/IBoundingBox";
import { type IClonable } from "../core/IClonable";
import { type IRenderingLayer } from "../core/RenderingLayer";
export declare class Fill extends Style implements IClonable<Fill> {
    constructor(style?: EntryStyleType);
    apply(renderingLayer: IRenderingLayer, boundingBox: IBoundingBox): void;
    clone(): Fill;
    static clear(renderingLayer: IRenderingLayer): void;
}
