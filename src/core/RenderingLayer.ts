import type { Transform } from "../properties/Transform.js";


export class RenderingLayer implements IRenderingLayer {
    static readonly DefaultUpdatesizeCallback: UpdateSizeCallbackType = (canvas: HTMLCanvasElement, width: number, height: number, pixelScale: number): void => {
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
    }

    /**
     * @deprecated Use `DefaultUpdatesizeCallback`
     */
    static readonly DEFAULT_UPDATESIZE_CALLBACK = RenderingLayer.DefaultUpdatesizeCallback;


    get width(): number { return this._width; }
    private _width: number = 0;

    get height(): number { return this._height; }
    private _height: number = 0;


    get pixelScale(): number { return this._pixelScale; }
    private _pixelScale: number = 1;


    get renderingSettings(): CanvasRenderingContext2DSettings { return this._renderingSettings; }
    private _renderingSettings: CanvasRenderingContext2DSettings = {
        willReadFrequently: true,
        colorSpace: 'srgb'
    };


    private _updateSizeCallback: UpdateSizeCallbackType = RenderingLayer.DefaultUpdatesizeCallback;

    private _canvas: HTMLCanvasElement;
    private _renderingContext!: CanvasRenderingContext2D;


    gizmoVisibility: boolean = false;
    gizmoScale: number = 1;


    constructor(canvas: HTMLCanvasElement, width: number, height: number, pixelScale?: number, renderingSettings?: CanvasRenderingContext2DSettings) {
        this._canvas = canvas;

        this.setSize(width, height);
        
        if (pixelScale) this.setPixelScale(pixelScale)
        if (renderingSettings) this.setRenderingSettings(renderingSettings);
    }


    /**
     * 
     * @param width Width of canvas.
     * @param height Height of canvas.
     * @param pixelScale Resolution scale for retina stuff. If `undefined`, will used value from last time.
     * @param updateStyleSize If it is `true`, the style will be set by the callback `updateStyleSizeCallback`. If `undefined`, will used value from last time.
     */
    setSize(width: number, height: number) {
        this._width = Math.max(width, 0);
        this._height = Math.max(height, 0);

        this._updateCanvas();
    }


    private _updateCanvas() {
        this._canvas.width = this.width * this.pixelScale;
        this._canvas.height = this.height * this.pixelScale;

        this._updateSizeCallback(this._canvas, this.width, this.height, this.pixelScale);
        this.resetRenderingContext();
    }


    setUpdateSizeCallback(callback: UpdateSizeCallbackType) {
        this._updateSizeCallback = callback;
        this._updateCanvas();
    }


    setPixelScale(pixelScale: number) {
        this._pixelScale = Math.max(0, pixelScale);
        this._updateCanvas();
    }


    setRenderingSettings(settings: CanvasRenderingContext2DSettings) {
        this._renderingSettings = settings;
        this._updateCanvas();
    }


    /**
     * @deprecated Use method `setSize`.
     */
    updateSize(width: number, height: number, pixelScale?: number, updateStyleSizeCallback?: UpdateSizeCallbackType | null) {
        console.warn('Method `updateSize` id deprecated. Use `setSize`.')
        
        this.setSize(width, height);
        if (pixelScale) this.setPixelScale(pixelScale);
        if (updateStyleSizeCallback) this.setUpdateSizeCallback(updateStyleSizeCallback);
    }


    clear() {
        const pxs = this.pixelScale;

        this.resetMatrix();
        this._renderingContext.clearRect(0, 0, this.width * pxs, this.height * pxs);
    }


    getRenderingContext(): CanvasRenderingContext2D {
        return this._renderingContext;
    }


    resetRenderingContext() {
        this._renderingContext = this._canvas.getContext('2d', this.renderingSettings) as CanvasRenderingContext2D;
    }


    setImageSmoothing(value: boolean) {
        const ctx = this.getRenderingContext();

        (ctx as any).msImageSmoothingEnabled = value;
        (ctx as any).mozImageSmoothingEnabled = value;
        (ctx as any).webkitImageSmoothingEnabled = value;
        ctx.imageSmoothingEnabled = value;
    }


    getCanvas(): HTMLCanvasElement {
        return this._canvas;
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
            this._renderingContext.translate(t.position.x * pxs, t.position.y * pxs);
            this._renderingContext.rotate(t.rotation.radians);
            this._renderingContext.scale(t.scale.x, t.scale.y);
        });
    }


    resetMatrix() {
        this._renderingContext.resetTransform();
    }


    static getDevicePixelRatio() {
        return window.devicePixelRatio;
    }


    /**
     * @deprecated Use static method `getDevicePixelRatio`
     */
    static get PIXELSCALE(): number { return RenderingLayer.getDevicePixelRatio(); }
}


export interface IRenderingLayer {
    readonly pixelScale: number;
    readonly width: number;
    readonly height: number;

    gizmoVisibility: boolean;
    gizmoScale: number;

    updateSize(width: number, height: number, pixelScale: number): void;

    clear(): void;

    getRenderingContext(): CanvasRenderingContext2D;
    resetRenderingContext(): void;

    setImageSmoothing(toggle: boolean): void;

    getCanvas(): HTMLCanvasElement;

    setMatrixToTransform(transform: Transform): void;
    resetMatrix(): void;
}


export type UpdateSizeCallbackType = {
    (canvas: HTMLCanvasElement, width: number, height: number, pixelScale: number): void;
};


/**
 * @deprecated Use `UpdateSizeCallbackType`
 */
export type UpdateStyleSizeCallbackType = UpdateSizeCallbackType;