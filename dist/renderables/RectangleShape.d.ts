import { Fill } from "../properties/Fill.js";
import { IClonable } from "../core/IClonable.js";
import { IRenderable } from "./IRenderable.js";
import { IRenderingLayer } from "../core/RenderingLayer.js";
import { IShape } from "./IShape.js";
import { RectangleGeometry } from "./RectangleGeometry.js";
import { Shadow } from "../properties/Shadow.js";
import { Stroke } from "../properties/Stroke.js";
export declare class RectangleShape extends RectangleGeometry implements IRenderable, IShape, IClonable<RectangleShape> {
    fill: Fill | null;
    stroke: Stroke | null;
    shadow: Shadow | null;
    opacity: number;
    constructor(width: number, height: number);
    render(renderingLayer: IRenderingLayer): void;
    renderGizmo(renderingLayer: IRenderingLayer): void;
    clone(): RectangleShape;
}
