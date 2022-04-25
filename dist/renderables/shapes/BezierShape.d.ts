import { BezierGeometry } from "../geometries/BezierGeometry";
import { type BezierPoint } from "../../units/BezierPoint";
import { type Fill } from "../../properties/Fill";
import { type IRenderable } from "../IRenderable";
import { type IRenderingLayer } from "../../core/RenderingLayer";
import { type IShape } from "./IShape";
import { type Shadow } from "../../properties/Shadow";
import { type Stroke } from "../../properties/Stroke";
export declare class BezierShape extends BezierGeometry implements IRenderable, IShape {
    fill: Fill | null;
    stroke: Stroke | null;
    shadow: Shadow | null;
    opacity: number;
    constructor(...points: BezierPoint[]);
    render(renderingLayer: IRenderingLayer): void;
    renderGizmo(renderingLayer: IRenderingLayer): void;
}
