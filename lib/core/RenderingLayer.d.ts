import type { Transform } from "../properties/Transform.js";
import type { UpdateSizeCallbackType } from "./UpdateSizeCallbackType";
import type { IRenderingLayer } from "./IRenderingLayer";
export type { UpdateSizeCallbackType } from "./UpdateSizeCallbackType";
export type { IRenderingLayer } from "./IRenderingLayer";
export declare class RenderingLayer implements IRenderingLayer {
    static readonly DefaultUpdatesizeCallback: UpdateSizeCallbackType;
    /**
     * @deprecated Use `DefaultUpdatesizeCallback`
     */
    static readonly DEFAULT_UPDATESIZE_CALLBACK: UpdateSizeCallbackType;
    get width(): number;
    private _width;
    get height(): number;
    private _height;
    get pixelScale(): number;
    private _pixelScale;
    get renderingSettings(): CanvasRenderingContext2DSettings;
    private _renderingSettings;
    private _updateSizeCallback;
    private _canvas;
    private _renderingContext;
    gizmoVisibility: boolean;
    gizmoScale: number;
    constructor(canvas: HTMLCanvasElement, width: number, height: number, pixelScale?: number, renderingSettings?: CanvasRenderingContext2DSettings);
    /**
     *
     * @param width Width of canvas.
     * @param height Height of canvas.
     * @param pixelScale Resolution scale for retina stuff. If `undefined`, will used value from last time.
     * @param updateStyleSize If it is `true`, the style will be set by the callback `updateStyleSizeCallback`. If `undefined`, will used value from last time.
     */
    setSize(width: number, height: number): void;
    private _updateCanvas;
    setUpdateSizeCallback(callback: UpdateSizeCallbackType): void;
    setPixelScale(pixelScale: number): void;
    setRenderingSettings(settings: CanvasRenderingContext2DSettings): void;
    /**
     * @deprecated Use method `setSize`.
     */
    updateSize(width: number, height: number, pixelScale?: number, updateStyleSizeCallback?: UpdateSizeCallbackType | null): void;
    clear(): void;
    getRenderingContext(): CanvasRenderingContext2D;
    resetRenderingContext(): void;
    setImageSmoothing(value: boolean): void;
    getCanvas(): HTMLCanvasElement;
    setMatrixToTransform(transform: Transform): void;
    resetMatrix(): void;
    static getDevicePixelRatio(): number;
    /**
     * @deprecated Use static method `getDevicePixelRatio`
     */
    static get PIXELSCALE(): number;
}
