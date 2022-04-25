import { Transform } from "../properties/Transform";
import { Vector } from "../units/Vector";
import { type IBoundingBox } from "../renderables/IBoundingBox";
import { type IClonable } from "../core/IClonable";
import { type IColorRGBA } from "../styles/Color";
import { type IRenderingLayer } from "../core/RenderingLayer";
import { type ITexture } from "./ITexture";
import { type Shadow } from "../properties/Shadow";
/**
 * @internal Texture is not ready.
 */
export declare class WorleyNoise implements ITexture, IClonable<WorleyNoise> {
    points: Vector[];
    limitMin: number;
    limitMax: number;
    contrast: number;
    readonly width: number;
    readonly height: number;
    transform: Transform;
    shadow: Shadow | null;
    opacity: number;
    private _shadowCanvas;
    private _pixelModifierCallback;
    constructor(width: number, height: number);
    setPixelModifierCallback(callback: IPixelModifierCallback): void;
    generate(renderingLayer: IRenderingLayer): Promise<void>;
    getBoundingBox(renderingLayer: IRenderingLayer): IBoundingBox;
    render(renderingLayer: IRenderingLayer): void;
    renderGizmo(renderingLayer: IRenderingLayer): void;
    clone(): WorleyNoise;
    static getRandomPoints(width: number, height: number, count: number): Vector[];
}
export interface IPixelModifierCallback {
    (red: number, green: number, blue: number, alpha: number, x: number, y: number, pixelIndex: number): IColorRGBA;
}
