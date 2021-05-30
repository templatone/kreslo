import type { IBoundingBox } from "../renderables/IBoundingBox.js";
import type { IClonable } from "../core/IClonable.js";
import type { IRenderingLayer } from "../core/RenderingLayer.js";
import { Style, EntryStyleType } from "../styles/Style.js";
export declare class Fill extends Style implements IClonable<Fill> {
    constructor(style?: EntryStyleType);
    apply(renderingLayer: IRenderingLayer, boundingBox: IBoundingBox): void;
    clone(): Fill;
    static clear(renderingLayer: IRenderingLayer): void;
}
