import { Vector } from "../units/Vector.js";
import { Angle } from "../units/Angle.js";
import { Stroke } from "../properties/Stroke.js";
import { Fill } from "../properties/Fill.js";
import { Shadow } from "../properties/Shadow.js";
import { PieGeometry } from "./PieGeometry.js";
import { Helper } from "./Helper.js";
import { Gizmo } from "./Gizmo.js";
import { IRenderingLayer } from "../RenderingLayer.js";
import { IObject } from "./IObject.js";
import { IRenderable } from "./IRenderable.js";
import { IShape } from "./IVisible.js";


export class PieShape extends PieGeometry implements IObject, IRenderable, IShape {

    fill: Fill|null = null;
    stroke: Stroke|null = null;
    shadow: Shadow|null = null;

    opacity: number = 1;


    constructor(width: number, height: number, startAngle: Angle, endAngle: Angle, innerRadius: number) {
        super(width, height, startAngle, endAngle, innerRadius);
    }


    render(renderingLayer: IRenderingLayer) {
        Helper.renderShape(renderingLayer, this);
    }


    renderGizmos(renderingLayer: IRenderingLayer) {
        renderingLayer.setMatrixToTransform(this.transform);
        
        Gizmo.origin(renderingLayer, Vector.zero(), Gizmo.shapeColor);
        
        renderingLayer.resetMatrix();
    }
}