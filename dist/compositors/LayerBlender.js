import { RenderingLayer } from "../core/RenderingLayer";
export class LayerBlender {
    upperLayer;
    lowerLayer;
    #resultLayer;
    compositeOperation;
    constructor(width, height, compositeOperation) {
        const matteCanvas = document.createElement('canvas');
        const sourceCanvas = document.createElement('canvas');
        const resultCanvas = document.createElement('canvas');
        this.upperLayer = new RenderingLayer(matteCanvas, width, height);
        this.lowerLayer = new RenderingLayer(sourceCanvas, width, height);
        this.#resultLayer = new RenderingLayer(resultCanvas, width, height);
        this.compositeOperation = compositeOperation;
    }
    render(renderingLayer) {
        const matteCanvas = this.upperLayer.getCanvas();
        const sourceCanvas = this.lowerLayer.getCanvas();
        const resultCanvas = this.#resultLayer.getCanvas();
        this.#resultLayer.clear();
        const resultCtx = this.#resultLayer.getRenderingContext();
        resultCtx.globalCompositeOperation = CompositeOperation.SourceOver;
        resultCtx.drawImage(matteCanvas, 0, 0);
        resultCtx.globalCompositeOperation = this.compositeOperation;
        resultCtx.drawImage(sourceCanvas, 0, 0);
        const ctx = renderingLayer.getRenderingContext();
        ctx.drawImage(resultCanvas, 0, 0);
    }
    clear() {
        this.lowerLayer.clear();
        this.upperLayer.clear();
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
