import { EllipseGeometry } from "./EllipseGeometry.js";
import { Fill } from "../properties/Fill.js";
import { IClonable } from "../core/IClonable.js";
import { IRenderable } from "./IRenderable.js";
import { IRenderingLayer } from "../core/RenderingLayer.js";
import { IShape } from "./IShape.js";
import { Shadow } from "../properties/Shadow.js";
import { Stroke } from "../properties/Stroke.js";
export declare class EllipseShape extends EllipseGeometry implements IRenderable, IShape, IClonable<EllipseShape> {
    fill: Fill | null;
    stroke: Stroke | null;
    shadow: Shadow | null;
    opacity: number;
    constructor(width: number, height: number);
    render(renderingLayer: IRenderingLayer): void;
    renderGizmo(renderingLayer: IRenderingLayer): void;
    clone(): EllipseShape;
}
