import { EllipseGeometry } from "../geometries/EllipseGeometry";
import { type Fill } from "../../properties/Fill";
import { type IClonable } from "../../core/IClonable";
import { type IRenderable } from "../IRenderable";
import { type IRenderingLayer } from "../../core/RenderingLayer";
import { type IShape } from "./IShape";
import { type Shadow } from "../../properties/Shadow";
import { type Stroke } from "../../properties/Stroke";
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
