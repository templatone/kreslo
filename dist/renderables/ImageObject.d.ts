import { Shadow } from "../properties/Shadow";
import { Transform } from "../properties/Transform";
import { type IBoundingBox } from "./IBoundingBox";
import { type IClonable } from "../core/IClonable";
import { type IObject } from "./IObject";
import { type IRenderable } from "./IRenderable";
import { type IRenderingLayer } from "../core/RenderingLayer";
import { type IVisible } from "./IVisible";
import { type ValueModifierType } from "../helpers/valueModifier";
export declare class ImageObject implements IObject, IRenderable, IVisible, IClonable<ImageObject> {
    readonly source: HTMLImageElement;
    readonly width: number;
    readonly height: number;
    transform: Transform;
    shadow: Shadow | null;
    opacity: number;
    constructor(image: HTMLImageElement, width?: number | ValueModifierType<number>, height?: number | ValueModifierType<number>);
    getBoundingBox(renderingLayer: IRenderingLayer): IBoundingBox;
    render(renderingLayer: IRenderingLayer): void;
    renderGizmo(renderingLayer: IRenderingLayer): void;
    clone(): ImageObject;
}
