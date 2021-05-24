import { IBoundingBox } from "./IBoundingBox.js";
import { IClonable } from "../core/IClonable.js";
import { IObject } from "./IObject.js";
import { IRenderingLayer } from "../core/RenderingLayer.js";
import { Transform } from "../properties/Transform.js";
export declare class NullObject implements IObject, IClonable<NullObject> {
    transform: Transform;
    constructor();
    getBoundingBox(renderingLayer: IRenderingLayer): IBoundingBox;
    render(renderingLayer: IRenderingLayer): void;
    renderGizmos(renderingLayer: IRenderingLayer): void;
    clone(): NullObject;
}
