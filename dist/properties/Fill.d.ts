import { IBoundingBox } from "../renderables/IBoundingBox.js";
import { IClonable } from "../core/IClonable.js";
import { IRenderingLayer } from "../core/RenderingLayer.js";
import { Style, EntryType_Style } from "../styles/Style.js";
export declare class Fill extends Style implements IClonable<Fill> {
    constructor(style?: EntryType_Style);
    apply(renderingLayer: IRenderingLayer, boundingBox: IBoundingBox): void;
    clone(): Fill;
    static clear(renderingLayer: IRenderingLayer): void;
}
