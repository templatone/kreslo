import type { Transform } from "../properties/Transform.js";
import type { UpdateSizeCallbackType } from "./UpdateSizeCallbackType";


export interface IRenderingLayer {
    readonly width: number;
    readonly height: number;
    readonly pixelScale: number;
    readonly renderingSettings: CanvasRenderingContext2DSettings;

    setSize(width: number, height: number): void;
    setPixelScale(pixelScale: number): void;
    setRenderingSettings(settings: CanvasRenderingContext2DSettings): void;
    setUpdateSizeCallback(callback: UpdateSizeCallbackType): void;

    gizmoVisibility: boolean;
    gizmoScale: number;

    clear(): void;

    getRenderingContext(): CanvasRenderingContext2D;
    resetRenderingContext(): void;

    setImageSmoothing(toggle: boolean): void;

    getCanvas(): HTMLCanvasElement;

    setMatrixToTransform(transform: Transform): void;
    resetMatrix(): void;
}