import { RenderingLayer } from "../core/RenderingLayer";
import { type IRenderable } from "../renderables/IRenderable";
import { type IRenderingLayer } from "../core/RenderingLayer";
import { Shadow, Transform } from "../properties/mod";
import { IBoundingBox, IObject, IVisible } from "../renderables/mod";
export declare class Compositor implements IObject, IRenderable, IVisible {
    #private;
    readonly brendingLayer: RenderingLayer;
    readonly baseLayer: RenderingLayer;
    readonly compositeOperation: CompositeOperation;
    readonly width: number;
    readonly height: number;
    transform: Transform;
    shadow: Shadow | null;
    opacity: number;
    constructor(width: number, height: number, compositeOperation: CompositeOperation);
    getBoundingBox(renderingLayer: IRenderingLayer): IBoundingBox;
    render(renderingLayer: IRenderingLayer): void;
    renderGizmo(renderingLayer: IRenderingLayer): void;
    clear(): void;
}
export declare const enum CompositeOperation {
    Color = "color",
    ColorBurn = "color-burn",
    ColorDodge = "color-dodge",
    Copy = "copy",
    Darken = "darken",
    DestinationAtop = "destination-atop",
    DestinationIn = "destination-in",
    DestinationOut = "destination-out",
    DestinationOver = "destination-over",
    Difference = "difference",
    Exclusion = "exclusion",
    HardLight = "hard-light",
    Hue = "hue",
    Lighten = "lighten",
    Lighter = "lighter",
    Luminosity = "luminosity",
    Multiply = "multiply",
    Overlay = "overlay",
    Saturation = "saturation",
    Screen = "screen",
    SoftLight = "soft-light",
    SourceAtop = "source-atop",
    SourceIn = "source-in",
    SourceOut = "source-out",
    SourceOver = "source-over",
    XOR = "xor"
}
