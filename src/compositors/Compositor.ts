import { Numbers } from "@templatone/utils";
import { RenderingLayer } from "../core/RenderingLayer";
import { type IRenderable } from "../renderables/IRenderable";
import { type IRenderingLayer } from "../core/RenderingLayer";
import { Shadow, Transform } from "../properties/mod";
import { IBoundingBox, IObject, IVisible } from "../renderables/mod";
import { Vector } from "../units/mod";
import { Gizmo } from "../debugger/Gizmo";


export class Compositor implements IObject, IRenderable, IVisible {

    readonly brendingLayer: RenderingLayer;
    readonly baseLayer: RenderingLayer;
    #resultLayer: RenderingLayer;

    readonly operation: CompositeOperation;

    readonly width: number;
    readonly height: number;

    transform: Transform = new Transform();

    shadow: Shadow | null = null;
    opacity: number = 1;


    constructor(width: number, height: number, operation: CompositeOperation) {
        this.width = width;
        this.height = height;

        const blendingCanvas = document.createElement('canvas');
        const baseCanvas = document.createElement('canvas');
        const resultCanvas = document.createElement('canvas');

        this.brendingLayer = new RenderingLayer(blendingCanvas, this.width, this.height);
        this.baseLayer = new RenderingLayer(baseCanvas, this.width, this.height);
        this.#resultLayer = new RenderingLayer(resultCanvas, this.width, this.height);

        this.operation = operation;
    }


    getBoundingBox(renderingLayer: IRenderingLayer): IBoundingBox {
        return {
            origin: this.transform.origin.clone(),
            size: new Vector(this.width, this.height),
        }
    }


    render(renderingLayer: IRenderingLayer) {
        const matteCanvas = this.brendingLayer.getCanvas();
        const sourceCanvas = this.baseLayer.getCanvas();
        const resultCanvas = this.#resultLayer.getCanvas();

        this.#resultLayer.clear();

        const resultCtx = this.#resultLayer.getRenderingContext();
        resultCtx.globalCompositeOperation = CompositeOperation.SourceOver;
        resultCtx.drawImage(matteCanvas, 0, 0);

        resultCtx.globalCompositeOperation = this.operation;
        resultCtx.drawImage(sourceCanvas, 0, 0);

        this.#render(renderingLayer, resultCanvas);
    }


    renderGizmo(renderingLayer: IRenderingLayer) {
        // TODO: Add gizmo
        // renderingLayer.setMatrixToTransform(this.transform);
        // Gizmo.origin(renderingLayer, Vector.Zero, Gizmo.mediaColor);
        // renderingLayer.resetMatrix();
    }


    #render(renderingLayer: IRenderingLayer, source: CanvasImageSource) {
        const ctx = renderingLayer.getRenderingContext();
        const pxs = renderingLayer.pixelScale;

        const t = this.transform;

        renderingLayer.setMatrixToTransform(t);

        ctx.globalAlpha = Numbers.limit(this.opacity, 0, 1);

        if (this.shadow) {
            this.shadow.apply(renderingLayer, this.getBoundingBox(renderingLayer));
        } else {
            Shadow.clear(renderingLayer);
        }

        ctx.moveTo(-t.origin.x * pxs, -t.origin.y * pxs);
        ctx.drawImage(source, 0, 0, this.width * pxs, this.height * pxs);

        renderingLayer.resetMatrix();

        ctx.globalAlpha = 1;

        if (renderingLayer.gizmoVisibility && this.renderGizmo) this.renderGizmo(renderingLayer);
    }


    clear() {
        this.baseLayer.clear();
        this.brendingLayer.clear();
    }

}


export const enum CompositeOperation {
    Color = 'color',
    ColorBurn = 'color-burn',
    ColorDodge = 'color-dodge',
    Copy = 'copy',
    Darken = 'darken',
    DestinationAtop = 'destination-atop',
    DestinationIn = 'destination-in',
    DestinationOut = 'destination-out',
    DestinationOver = 'destination-over',
    Difference = 'difference',
    Exclusion = 'exclusion',
    HardLight = 'hard-light',
    Hue = 'hue',
    Lighten = 'lighten',
    Lighter = 'lighter',
    Luminosity = 'luminosity',
    Multiply = 'multiply',
    Overlay = 'overlay',
    Saturation = 'saturation',
    Screen = 'screen',
    SoftLight = 'soft-light',
    SourceAtop = 'source-atop',
    SourceIn = 'source-in',
    SourceOut = 'source-out',
    SourceOver = 'source-over',
    XOR = 'xor',
}


// export const enum CompositeOperation {
//     SourceOver = 'source-over',
//     SourceAtop = 'source-atop',
//     SourceIn = 'source-in',
//     SourceOut = 'source-out',
//     DestinationOver = 'destination-over',
//     DestinationAtop = 'destination-atop',
//     DestinationIn = 'destination-in',
//     DestinationOut = 'destination-out',
//     Lighter = 'lighter',
//     Copy = 'copy',
//     XOR = 'xor',
// }