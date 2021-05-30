import type { Fill } from "../properties/Fill.js";
import type { IClonable } from "../core/IClonable.js";
import type { IRenderable } from "./IRenderable.js";
import type { IRenderingLayer } from "../core/RenderingLayer.js";
import type { IShape } from "./IShape.js";
import { MultipleRadiusInitType, RoundedRectangleGeometry } from "./RoundedRectangleGeometry.js";
import type { Shadow } from "../properties/Shadow.js";
import { Shape } from "./Shape.js";
import type { Stroke } from "../properties/Stroke.js";


export class RoundedRectangleShape extends RoundedRectangleGeometry implements IRenderable, IShape, IClonable<RoundedRectangleShape> {

    fill: Fill | null = null;
    stroke: Stroke | null = null;
    shadow: Shadow | null = null;
    opacity: number = 1;


    constructor(width: number, height: number, ...radius: MultipleRadiusInitType) {
        super(width, height, ...radius);
    }


    render(renderingLayer: IRenderingLayer) {
        Shape.renderObject(renderingLayer, this, this, this);
    }


    renderGizmo(renderingLayer: IRenderingLayer) {
        Shape.renderGizmo(renderingLayer, this);
    }


    clone(): RoundedRectangleShape {
        const topLeftRadius = { x: this.topLeftRadius.x, y: this.topLeftRadius.y };
        const topRightRadius = { x: this.topRightRadius.x, y: this.topRightRadius.y };
        const bottomRightRadius = { x: this.bottomRightRadius.x, y: this.bottomRightRadius.y };
        const bottomLeftRadius = { x: this.bottomLeftRadius.x, y: this.bottomLeftRadius.y };

        const shape = new RoundedRectangleShape(this.width, this.height, topLeftRadius, topRightRadius, bottomRightRadius, bottomLeftRadius);
        shape.fill = this.fill?.clone() ?? null;
        shape.stroke = this.stroke?.clone() ?? null;
        shape.shadow = this.shadow?.clone() ?? null;
        shape.opacity = this.opacity;

        return shape;
    }
}