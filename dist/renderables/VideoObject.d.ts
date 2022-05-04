import { Shadow } from "../properties/Shadow";
import { Transform } from "../properties/Transform";
import { type IBoundingBox } from "./IBoundingBox";
import { type IClonable } from "../core/IClonable";
import { type IObject } from "./IObject";
import { type IRenderable } from "./IRenderable";
import { type IRenderingLayer } from "../core/RenderingLayer";
import { type IVisible } from "./IVisible";
import { type ValueModifierType } from "../helpers/valueModifier";
declare type TimeEntry = [seconds: number] | [frames: number, fps: number];
export declare class VideoObject implements IObject, IRenderable, IVisible, IClonable<VideoObject> {
    readonly source: HTMLVideoElement;
    readonly width: number;
    readonly height: number;
    transform: Transform;
    shadow: Shadow | null;
    opacity: number;
    constructor(source: HTMLVideoElement, width?: number | ValueModifierType<number>, height?: number | ValueModifierType<number>);
    getBoundingBox(renderingLayer: IRenderingLayer): IBoundingBox;
    setTime(...entry: TimeEntry): void;
    render(renderingLayer: IRenderingLayer): void;
    renderGizmo(renderingLayer: IRenderingLayer): void;
    clone(): VideoObject;
}
export {};
