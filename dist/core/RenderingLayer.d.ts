import { type Transform } from "../properties/Transform";
import { type UpdateSizeCallbackType } from "./UpdateSizeCallbackType";
import { type IRenderingLayer } from "./IRenderingLayer";
export type { UpdateSizeCallbackType } from "./UpdateSizeCallbackType";
export { type IRenderingLayer } from "./IRenderingLayer";
export declare class RenderingLayer implements IRenderingLayer {
    #private;
    static readonly DefaultUpdatesizeCallback: UpdateSizeCallbackType;
    get width(): number;
    get height(): number;
    get pixelScale(): number;
    get renderingSettings(): CanvasRenderingContext2DSettings;
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
