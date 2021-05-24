import { Fill } from "../properties/Fill.js";
import { Font } from "../properties/Font.js";
import { IBoundingBox } from "./IBoundingBox.js";
import { IClonable } from "../core/IClonable.js";
import { IObject } from "./IObject.js";
import { IRenderable } from "./IRenderable.js";
import { IRenderingLayer } from "../core/RenderingLayer.js";
import { IShape } from "./IShape.js";
import { Shadow } from "../properties/Shadow.js";
import { Stroke } from "../properties/Stroke.js";
import { Transform } from "../properties/Transform.js";
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
