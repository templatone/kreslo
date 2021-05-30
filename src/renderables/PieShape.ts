import type { Angle } from "../units/Angle.js";
import type { Fill } from "../properties/Fill.js";
import type { IRenderable } from "./IRenderable.js";
import type { IRenderingLayer } from "../core/RenderingLayer.js";
import type { IShape } from "./IShape.js";
import { PieGeometry } from "./PieGeometry.js";
import type { Shadow } from "../properties/Shadow.js";
import { Shape } from "./Shape.js";
import type { Stroke } from "../properties/Stroke.js";


export class PieShape extends PieGeometry implements IRenderable, IShape {

    fill: Fill | null = null;
    stroke: Stroke | null = null;
    shadow: Shadow | null = null;

    opacity: number = 1;


    constructor(width: number, height: number, startAngle: Angle, endAngle: Angle, innerRadius: number) {
        super(width, height, startAngle, endAngle, innerRadius);
    }


    render(renderingLayer: IRenderingLayer) {
        Shape.renderObject(renderingLayer, this, this, this);
    }


    renderGizmo(renderingLayer: IRenderingLayer) {
        Shape.renderGizmo(renderingLayer, this);
    }
}