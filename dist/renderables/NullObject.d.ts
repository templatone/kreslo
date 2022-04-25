import { Transform } from "../properties/Transform";
import { type IBoundingBox } from "./IBoundingBox";
import { type IClonable } from "../core/IClonable";
import { type IObject } from "./IObject";
import { type IRenderingLayer } from "../core/RenderingLayer";
export declare class NullObject implements IObject, IClonable<NullObject> {
    transform: Transform;
    constructor();
    getBoundingBox(renderingLayer: IRenderingLayer): IBoundingBox;
    render(renderingLayer: IRenderingLayer): void;
    renderGizmos(renderingLayer: IRenderingLayer): void;
    clone(): NullObject;
}
