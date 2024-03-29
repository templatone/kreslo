import { Gizmo } from "../debugger/Gizmo";
import { Numbers } from "@templatone/utils";
import { Transform } from "../properties/Transform";
import { Vector } from "../units/Vector";
/**
 * @internal Texture is not ready.
 */
export class WorleyNoise {
    points = [];
    limitMin = 0;
    limitMax = 255;
    contrast = 1;
    width;
    height;
    transform = new Transform();
    shadow = null;
    opacity = 1;
    _shadowCanvas = null;
    _pixelModifierCallback = (red, green, blue, alpha, x, y, pixelIndex) => {
        return { red, green, blue, alpha: 1 };
    };
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }
    setPixelModifierCallback(callback) {
        this._pixelModifierCallback = callback;
    }
    async generate(renderingLayer) {
        const promise = new Promise((resolve, reject) => {
            const width = this.width * renderingLayer.pixelScale;
            const height = this.height * renderingLayer.pixelScale;
            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            const imageData = ctx.createImageData(width, height);
            const buffer = new Uint8Array(imageData.data.buffer);
            const nClosest = 0;
            for (let x = 0; x < this.width; x++) {
                for (let y = 0; y < this.height; y++) {
                    const pixelIndex = x + y * this.width;
                    const channelIndex = pixelIndex * 4;
                    const distances = Array(this.points.length);
                    for (let i = 0; i < this.points.length; i++) {
                        const point = this.points[i];
                        const d = Vector.distance({ x, y }, point); // Připočítat retinu
                        distances[i] = d;
                    }
                    const sortedDistances = distances.sort((a, b) => a - b);
                    const nClosestDistance = sortedDistances[Math.min(nClosest, sortedDistances.length - 1)] * this.contrast;
                    const noise = Numbers.remap(Numbers.limit(nClosestDistance, this.limitMin, this.limitMax), this.limitMin, this.limitMax, 0, 255);
                    const color = this._pixelModifierCallback(noise, noise, noise, noise, x, y, pixelIndex);
                    buffer[channelIndex + 0] = color.red;
                    buffer[channelIndex + 1] = color.green;
                    buffer[channelIndex + 2] = color.blue;
                    buffer[channelIndex + 3] = color.alpha * 255;
                }
            }
            ctx.putImageData(imageData, 0, 0);
            this._shadowCanvas = canvas;
            resolve();
        });
    }
    getBoundingBox(renderingLayer) {
        return {
            origin: this.transform.origin.clone(),
            size: new Vector(this.width, this.height),
        };
    }
    render(renderingLayer) {
        const ctx = renderingLayer.getRenderingContext();
        const pxs = renderingLayer.pixelScale;
        const t = this.transform;
        renderingLayer.setMatrixToTransform(t);
        ctx.moveTo(-t.origin.x * pxs, -t.origin.y * pxs);
        if (this._shadowCanvas) {
            ctx.drawImage(this._shadowCanvas, 0, 0, this.width * pxs, this.height * pxs);
        }
        else {
            throw new Error("WorleyNoise is not generated.");
        }
        renderingLayer.resetMatrix();
        if (renderingLayer.gizmoVisibility && this.renderGizmo)
            this.renderGizmo(renderingLayer);
    }
    renderGizmo(renderingLayer) {
        renderingLayer.setMatrixToTransform(this.transform);
        Gizmo.origin(renderingLayer, Vector.Zero, Gizmo.mediaColor);
        renderingLayer.resetMatrix();
    }
    clone() {
        const texture = new WorleyNoise(this.width, this.height);
        texture.points = this.points.map(p => p.clone());
        texture.limitMin = this.limitMin;
        texture.limitMax = this.limitMax;
        texture.contrast = this.contrast;
        texture.transform = this.transform.clone();
        texture.shadow = this.shadow?.clone() ?? null;
        texture.opacity = this.opacity;
        return texture;
    }
    static getRandomPoints(width, height, count) {
        const points = [];
        for (let i = 0; i < count; i++) {
            const p = new Vector(Math.random() * width, Math.random() * height);
            points.push(p);
        }
        return points;
    }
}
