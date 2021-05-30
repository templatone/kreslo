import { Shape } from "./Shape.js";
import { TrimablePolygonGeometry } from "./TrimablePolygonGeometry.js";
import type { Fill } from "../properties/Fill.js";
import type { IRenderable } from "./IRenderable.js";
import type { IRenderingLayer } from "../core/RenderingLayer.js";
import type { IShape } from "./IShape.js";
import type { IVector } from "../units/Vector.js";
import type { Shadow } from "../properties/Shadow.js";
import type { Stroke } from "../properties/Stroke.js";


export class TrimablePolygonShape extends TrimablePolygonGeometry implements IRenderable, IShape {

    fill: Fill | null = null;
    stroke: Stroke | null = null;
    shadow: Shadow | null = null;

    opacity: number = 1;

    constructor(points: IVector[], closed?: boolean, trimStart?: number, trimEnd?: number, trimOffset?: number) {
        super(points, closed, trimStart, trimEnd, trimOffset);
    }


    render(renderingLayer: IRenderingLayer) {
        Shape.renderObject(renderingLayer, this, this, this);
    }


    renderGizmo(renderingLayer: IRenderingLayer) {
        Shape.renderGizmo(renderingLayer, this);
    }
}