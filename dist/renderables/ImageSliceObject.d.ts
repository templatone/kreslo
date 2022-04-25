import { Transform } from "../properties/Transform";
import { type IBoundingBox } from "./IBoundingBox";
import { type IObject } from "./IObject";
import { type IRenderable } from "./IRenderable";
import { type IRenderingLayer } from "../core/RenderingLayer";
import { type IVisible } from "./IVisible";
import { type Shadow } from "../properties/Shadow";
/** @internal */
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
