import { Shadow } from "../properties/Shadow";
import { Transform } from "../properties/Transform";
import { type IBoundingBox } from "./IBoundingBox";
import { type IClonable } from "../core/IClonable";
import { type IObject } from "./IObject";
import { type IRenderable } from "./IRenderable";
import { type IRenderingLayer } from "../core/RenderingLayer";
import { type IVisible } from "./IVisible";
declare type TimeEntry = [seconds: number] | [frames: number, fps: number];
declare type ConstructorEntry = [source: HTMLVideoElement] | [source: HTMLVideoElement, width: number, height: number] | [
    source: HTMLVideoElement,
    width: number,
    height: number,
    crop: {
        x: number;
        y: number;
        width: number;
        height: number;
    }
];
export declare class VideoObject implements IObject, IRenderable, IVisible, IClonable<VideoObject> {
    #private;
    readonly source: HTMLVideoElement;
    readonly width: number;
    readonly height: number;
    transform: Transform;
    shadow: Shadow | null;
    opacity: number;
    constructor(...entry: ConstructorEntry);
    getBoundingBox(renderingLayer: IRenderingLayer): IBoundingBox;
    setTime(...entry: TimeEntry): void;
    render(renderingLayer: IRenderingLayer): void;
    renderGizmo(renderingLayer: IRenderingLayer): void;
    clone(): VideoObject;
}
export {};
