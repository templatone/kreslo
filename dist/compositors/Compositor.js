import { Numbers } from "@templatone/utils";
import { RenderingLayer } from "../core/RenderingLayer";
import { Shadow, Transform } from "../properties/mod";
import { Vector } from "../units/mod";
export class Compositor {
    brendingLayer;
    baseLayer;
    #resultLayer;
    operation;
    width;
    height;
    transform = new Transform();
    shadow = null;
    opacity = 1;
    constructor(width, height, operation) {
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
    getBoundingBox(renderingLayer) {
        return {
            origin: this.transform.origin.clone(),
            size: new Vector(this.width, this.height),
        };
    }
    render(renderingLayer) {
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
    renderGizmo(renderingLayer) {
        // TODO: Add gizmo
        // renderingLayer.setMatrixToTransform(this.transform);
        // Gizmo.origin(renderingLayer, Vector.Zero, Gizmo.mediaColor);
        // renderingLayer.resetMatrix();
    }
    #render(renderingLayer, source) {
        const ctx = renderingLayer.getRenderingContext();
        const pxs = renderingLayer.pixelScale;
        const t = this.transform;
        renderingLayer.setMatrixToTransform(t);
        ctx.globalAlpha = Numbers.limit(this.opacity, 0, 1);
        if (this.shadow) {
            this.shadow.apply(renderingLayer, this.getBoundingBox(renderingLayer));
        }
        else {
            Shadow.clear(renderingLayer);
        }
        ctx.moveTo(-t.origin.x * pxs, -t.origin.y * pxs);
        ctx.drawImage(source, 0, 0, this.width * pxs, this.height * pxs);
        renderingLayer.resetMatrix();
        ctx.globalAlpha = 1;
        if (renderingLayer.gizmoVisibility && this.renderGizmo)
            this.renderGizmo(renderingLayer);
    }
    clear() {
        this.baseLayer.clear();
        this.brendingLayer.clear();
    }
}
export var CompositeOperation;
(function (CompositeOperation) {
    CompositeOperation["Color"] = "color";
    CompositeOperation["ColorBurn"] = "color-burn";
    CompositeOperation["ColorDodge"] = "color-dodge";
    CompositeOperation["Copy"] = "copy";
    CompositeOperation["Darken"] = "darken";
    CompositeOperation["DestinationAtop"] = "destination-atop";
    CompositeOperation["DestinationIn"] = "destination-in";
    CompositeOperation["DestinationOut"] = "destination-out";
    CompositeOperation["DestinationOver"] = "destination-over";
    CompositeOperation["Difference"] = "difference";
    CompositeOperation["Exclusion"] = "exclusion";
    CompositeOperation["HardLight"] = "hard-light";
    CompositeOperation["Hue"] = "hue";
    CompositeOperation["Lighten"] = "lighten";
    CompositeOperation["Lighter"] = "lighter";
    CompositeOperation["Luminosity"] = "luminosity";
    CompositeOperation["Multiply"] = "multiply";
    CompositeOperation["Overlay"] = "overlay";
    CompositeOperation["Saturation"] = "saturation";
    CompositeOperation["Screen"] = "screen";
    CompositeOperation["SoftLight"] = "soft-light";
    CompositeOperation["SourceAtop"] = "source-atop";
    CompositeOperation["SourceIn"] = "source-in";
    CompositeOperation["SourceOut"] = "source-out";
    CompositeOperation["SourceOver"] = "source-over";
    CompositeOperation["XOR"] = "xor";
})(CompositeOperation || (CompositeOperation = {}));
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
