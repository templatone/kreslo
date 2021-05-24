import { IBoundingBox } from "./IBoundingBox.js";
import { IObject } from "./IObject.js";
import { IRenderable } from "./IRenderable.js";
import { IRenderingLayer } from "../core/RenderingLayer.js";
import { IVisible } from "./IVisible.js";
import { Shadow } from "../properties/Shadow.js";
import { Transform } from "../properties/Transform.js";
/** @deprecated */
export declare class ImageSliceObject implements IObject, IRenderable, IVisible {
    readonly source: HTMLImageElement;
    readonly width: number;
    readonly height: number;
    sliceX: number;
    sliceY: number;
    sliceWidth: number;
    sliceHeight: number;
    transform: Transform;
    shadow: Shadow | null;
    opacity: number;
    constructor(source: HTMLImageElement, sliceX: number, sliceY: number, sliceWidth: number, sliceHeight: number);
    getBoundingBox(renderingLayer: IRenderingLayer): IBoundingBox;
    render(renderingLayer: IRenderingLayer): void;
    renderGizmo(renderingLayer: IRenderingLayer): void;
    getImageElement(): HTMLImageElement;
}
