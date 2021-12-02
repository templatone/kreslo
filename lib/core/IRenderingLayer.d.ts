import type { Transform } from "../properties/Transform.js";
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
