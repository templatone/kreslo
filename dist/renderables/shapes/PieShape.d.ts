import { PieGeometry } from "../geometries/PieGeometry";
import { type Angle } from "../../units/Angle";
import { type Fill } from "../../properties/Fill";
import { type IRenderable } from "../IRenderable";
import { type IRenderingLayer } from "../../core/RenderingLayer";
import { type IShape } from "./IShape";
import { type Shadow } from "../../properties/Shadow";
import { type Stroke } from "../../properties/Stroke";
export declare class PieShape extends PieGeometry implements IRenderable, IShape {
    fill: Fill | null;
    stroke: Stroke | null;
    shadow: Shadow | null;
    opacity: number;
    constructor(width: number, height: number, startAngle: Angle, endAngle: Angle, innerRadius: number);
    render(renderingLayer: IRenderingLayer): void;
    renderGizmo(renderingLayer: IRenderingLayer): void;
}
