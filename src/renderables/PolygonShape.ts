import type { Fill } from "../properties/Fill.js";
import type { IRenderable } from "./IRenderable.js";
import type { IRenderingLayer } from "../core/RenderingLayer.js";
import type { IShape } from "./IShape.js";
import type { IVector } from "../units/Vector.js";
import { PolygonGeometry } from "./PolygonGeometry.js";
import type { Shadow } from "../properties/Shadow.js";
import { Shape } from "./Shape.js";
import type { Stroke } from "../properties/Stroke.js";


export class PolygonShape extends PolygonGeometry implements IRenderable, IShape {

    fill: Fill | null = null;
    stroke: Stroke | null = null;
    shadow: Shadow | null = null;

    opacity: number = 1;

    constructor(...points: IVector[]) {
        super(...points);
    }


    render(renderingLayer: IRenderingLayer) {
        Shape.renderObject(renderingLayer, this, this, this);
    }


    renderGizmo(renderingLayer: IRenderingLayer) {
        Shape.renderGizmo(renderingLayer, this);
    }
}