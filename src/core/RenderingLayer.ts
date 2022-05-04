import { type Transform } from "../properties/Transform";

import { type UpdateSizeCallbackType } from "./UpdateSizeCallbackType";
import { type IRenderingLayer } from "./IRenderingLayer";

export type { UpdateSizeCallbackType } from "./UpdateSizeCallbackType";
export { type IRenderingLayer } from "./IRenderingLayer";


export class RenderingLayer implements IRenderingLayer {
    static readonly DefaultUpdatesizeCallback: UpdateSizeCallbackType = (canvas: HTMLCanvasElement, width: number, height: number, pixelScale: number): void => {
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
    }


    get width(): number { return this.#width; }
    #width: number = 0;

    get height(): number { return this.#height; }
    #height: number = 0;


    get pixelScale(): number { return this.#pixelScale; }
    #pixelScale: number = 1;


    get renderingSettings(): CanvasRenderingContext2DSettings { return this.#renderingSettings; }
    #renderingSettings: CanvasRenderingContext2DSettings = {
        willReadFrequently: true,
        colorSpace: 'srgb'
    };


    #updateSizeCallback: UpdateSizeCallbackType = RenderingLayer.DefaultUpdatesizeCallback;

    #canvas: HTMLCanvasElement;
    #renderingContext!: CanvasRenderingContext2D;


    gizmoVisibility: boolean = false;
    gizmoScale: number = 1;


    constructor(canvas: HTMLCanvasElement, width: number, height: number, pixelScale?: number, renderingSettings?: CanvasRenderingContext2DSettings) {
        this.#canvas = canvas;

        this.setSize(width, height);
        
        if (pixelScale) this.setPixelScale(pixelScale)
        if (renderingSettings) this.setRenderingSettings(renderingSettings);
    }


    /**
     * @param width Width of canvas.
     * @param height Height of canvas.
     */
    setSize(width: number, height: number) {
        this.#width = Math.max(width, 0);
        this.#height = Math.max(height, 0);

        this._updateCanvas();
    }


    setPixelScale(pixelScale: number) {
        this.#pixelScale = Math.max(0, pixelScale);
        this._updateCanvas();
    }


    setRenderingSettings(settings: CanvasRenderingContext2DSettings) {
        this.#renderingSettings = settings;
        this._updateCanvas();
    }


    setUpdateSizeCallback(callback: UpdateSizeCallbackType) {
        this.#updateSizeCallback = callback;
        this._updateCanvas();
    }

    private _updateCanvas() {
        this.#canvas.width = this.width * this.pixelScale;
        this.#canvas.height = this.height * this.pixelScale;

        this.#updateSizeCallback(this.#canvas, this.width, this.height, this.pixelScale);
        this.resetRenderingContext();
    }


    clear() {
        const pxs = this.pixelScale;

        this.resetMatrix();
        this.#renderingContext.clearRect(0, 0, this.width * pxs, this.height * pxs);
    }


    getRenderingContext(): CanvasRenderingContext2D {
        return this.#renderingContext;
    }


    resetRenderingContext() {
        this.#renderingContext = this.#canvas.getContext('2d', this.renderingSettings) as CanvasRenderingContext2D;
    }


    setImageSmoothing(value: boolean) {
        const ctx = this.getRenderingContext();

        (ctx as any).msImageSmoothingEnabled = value;
        (ctx as any).mozImageSmoothingEnabled = value;
        (ctx as any).webkitImageSmoothingEnabled = value;
        ctx.imageSmoothingEnabled = value;
    }


    getCanvas(): HTMLCanvasElement {
        return this.#canvas;
    }


    setMatrixToTransform(transform: Transform) {
        this.resetMatrix();

        const pxs = this.pixelScale;
        const path: Transform[] = [];

        let t: Transform = transform;
        path.unshift(t);

        while (t.hasParent()) {
            t = t.getParent();
            path.unshift(t);
        }

        path.forEach(t => {
            this.#renderingContext.translate(t.position.x * pxs, t.position.y * pxs);
            this.#renderingContext.rotate(t.rotation.radians);
            this.#renderingContext.scale(t.scale.x, t.scale.y);
        });
    }


    resetMatrix() {
        this.#renderingContext.resetTransform();
    }


    static getDevicePixelRatio() {
        return window.devicePixelRatio;
    }
}
