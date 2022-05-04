import { RenderingLayer } from "../core/RenderingLayer";
import { type IRenderable } from "../renderables/IRenderable";
import { type IRenderingLayer } from "../core/RenderingLayer";
import { Shadow, Transform } from "../properties/mod";
import { IBoundingBox, IObject, IVisible } from "../renderables/mod";
export declare class CustomCompositor implements IObject, IRenderable, IVisible {
    #private;
    readonly brendingLayer: RenderingLayer;
    readonly baseLayer: RenderingLayer;
    readonly width: number;
    readonly height: number;
    transform: Transform;
    shadow: Shadow | null;
    opacity: number;
    constructor(width: number, height: number, operation: CompositeOperationCallback);
    getBoundingBox(renderingLayer: IRenderingLayer): IBoundingBox;
    render(renderingLayer: IRenderingLayer): void;
    renderGizmo(renderingLayer: IRenderingLayer): void;
    clear(): void;
}
export declare type CompositeOperationCallback = (basePixels: Uint8ClampedArray, brendingPixels: Uint8ClampedArray) => Uint8ClampedArray;
