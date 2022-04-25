import { type Transform } from "../properties/Transform";
import { type UpdateSizeCallbackType } from "./UpdateSizeCallbackType";
import { type IRenderingLayer } from "./IRenderingLayer";
export type { UpdateSizeCallbackType } from "./UpdateSizeCallbackType";
export { type IRenderingLayer } from "./IRenderingLayer";
export declare class RenderingLayer implements IRenderingLayer {
    static readonly DefaultUpdatesizeCallback: UpdateSizeCallbackType;
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
     * @param width Width of canvas.
     * @param height Height of canvas.
     */
    setSize(width: number, height: number): void;
    setPixelScale(pixelScale: number): void;
    setRenderingSettings(settings: CanvasRenderingContext2DSettings): void;
    setUpdateSizeCallback(callback: UpdateSizeCallbackType): void;
    private _updateCanvas;
    clear(): void;
    getRenderingContext(): CanvasRenderingContext2D;
    resetRenderingContext(): void;
    setImageSmoothing(value: boolean): void;
    getCanvas(): HTMLCanvasElement;
    setMatrixToTransform(transform: Transform): void;
    resetMatrix(): void;
    static getDevicePixelRatio(): number;
}
