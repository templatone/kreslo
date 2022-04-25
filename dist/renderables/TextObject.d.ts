import { Fill } from "../properties/Fill";
import { Font } from "../properties/Font";
import { Shadow } from "../properties/Shadow";
import { Stroke } from "../properties/Stroke";
import { Transform } from "../properties/Transform";
import { type IBoundingBox } from "./IBoundingBox";
import { type IClonable } from "../core/IClonable";
import { type IObject } from "./IObject";
import { type IRenderable } from "./IRenderable";
import { type IRenderingLayer } from "../core/RenderingLayer";
import { type IShape } from "./shapes/IShape";
export declare class TextObject implements IObject, IRenderable, IShape, IClonable<TextObject> {
    transform: Transform;
    private _contentLines;
    get content(): string;
    set content(content: string);
    fill: Fill | null;
    stroke: Stroke | null;
    font: Font;
    shadow: Shadow | null;
    opacity: number;
    constructor(content: string);
    getBoundingBox(renderingLayer: IRenderingLayer): IBoundingBox;
    render(renderingLayer: IRenderingLayer): void;
    renderGizmo(renderingLayer: IRenderingLayer): void;
    clone(): TextObject;
}
