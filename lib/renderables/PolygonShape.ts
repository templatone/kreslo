import { Fill } from "../properties/Fill.js";
import { IRenderable } from "./IRenderable.js";
import { IRenderingLayer } from "../core/RenderingLayer.js";
import { IShape } from "./IShape.js";
import { IVector } from "../units/Vector.js";
import { PolygonGeometry } from "./PolygonGeometry.js";
import { Shadow } from "../properties/Shadow.js";
import { Shape } from "./Shape.js";
import { Stroke } from "../properties/Stroke.js";


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