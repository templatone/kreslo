import { type IRenderable } from "../renderables/IRenderable";
import { type RenderingLayer, IRenderingLayer } from "../core/RenderingLayer";
export declare class TrackAlphaCompositor implements IRenderable {
    #private;
    get matteLayer(): RenderingLayer;
    get sourceLayer(): RenderingLayer;
    constructor(width: number, height: number, inverted?: boolean);
    render(renderingLayer: IRenderingLayer): void;
    clear(): void;
}
