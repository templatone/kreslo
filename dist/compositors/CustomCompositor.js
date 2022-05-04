import { Numbers } from "@templatone/utils";
import { RenderingLayer } from "../core/RenderingLayer";
import { Shadow, Transform } from "../properties/mod";
import { Vector } from "../units/mod";
export class CustomCompositor {
    brendingLayer;
    baseLayer;
    #resultLayer;
    #operation;
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
        this.#operation = operation;
    }
    getBoundingBox(renderingLayer) {
        return {
            origin: this.transform.origin.clone(),
            size: new Vector(this.width, this.height),
        };
    }
    render(renderingLayer) {
        this.#resultLayer.clear();
        const [width, height] = [this.width, this.height];
        const basePixels = this.baseLayer.getRenderingContext().getImageData(0, 0, width, height).data;
        const brendingPixels = this.brendingLayer.getRenderingContext().getImageData(0, 0, width, height).data;
        const resultPixels = this.#operation(basePixels, brendingPixels);
        const imageData = new ImageData(resultPixels, width, height);
        this.#resultLayer.getRenderingContext().putImageData(imageData, 0, 0);
        const resultCanvas = this.#resultLayer.getCanvas();
        this.#render(renderingLayer, resultCanvas);
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
        ctx.translate(-t.origin.x * pxs, -t.origin.y * pxs);
        ctx.drawImage(source, 0, 0, this.width * pxs, this.height * pxs);
        renderingLayer.resetMatrix();
        ctx.globalAlpha = 1;
        if (renderingLayer.gizmoVisibility && this.renderGizmo)
            this.renderGizmo(renderingLayer);
    }
    renderGizmo(renderingLayer) {
        // TODO: Add gizmo
        // renderingLayer.setMatrixToTransform(this.transform);
        // Gizmo.origin(renderingLayer, Vector.Zero, Gizmo.mediaColor);
        // renderingLayer.resetMatrix();
    }
    clear() {
        this.baseLayer.clear();
        this.brendingLayer.clear();
    }
}
