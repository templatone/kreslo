import { IBoundingBox } from "./IBoundingBox.js";
import { IClonable } from "../core/IClonable.js";
import { IObject } from "./IObject.js";
import { IRenderable } from "./IRenderable.js";
import { IRenderingLayer } from "../core/RenderingLayer.js";
import { IVisible } from "./IVisible.js";
import { Shadow } from "../properties/Shadow.js";
import { Transform } from "../properties/Transform.js";
import { valueModifier } from "../types/valueModifier.js";
export declare class ImageObject implements IObject, IRenderable, IVisible, IClonable<ImageObject> {
    readonly source: HTMLImageElement;
    readonly width: number;
    readonly height: number;
    transform: Transform;
    shadow: Shadow | null;
    opacity: number;
    constructor(image: HTMLImageElement, width?: number | valueModifier<number>, height?: number | valueModifier<number>);
    getBoundingBox(renderingLayer: IRenderingLayer): IBoundingBox;
    render(renderingLayer: IRenderingLayer): void;
    renderGizmo(renderingLayer: IRenderingLayer): void;
    clone(): ImageObject;
}
