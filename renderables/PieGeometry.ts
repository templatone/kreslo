import { Vector } from "../node_modules/kanafas-units/Vector.js";
import { Angle } from "../node_modules/kanafas-units/Angle.js";
import { Utils } from "../node_modules/kanafas-utils/index.js";
import { Transform } from "../properties/Transform.js";
import { IRenderingLayer } from "../RenderingLayer.js";
import { IObject, IGeometry, IBoxArea } from "./types.js";


export class PieGeometry implements IObject, IGeometry {
    transform: Transform = new Transform();

    width: number;
    height: number;

    startAngle: Angle;
    endAngle: Angle;

    innerRadius: number;


    constructor(width: number, height: number, startAngle: Angle, endAngle: Angle, innerRadius: number) {
        this.width = width;
        this.height = height;

        this.startAngle = startAngle;
        this.endAngle = endAngle;
        
        this.innerRadius = innerRadius;
    }


    contructMatrix(renderingLayer: IRenderingLayer) {
        const t = this.transform;

        renderingLayer.setMatrixToTransform(t);
    }


    destructMatrix(renderingLayer: IRenderingLayer) {
        renderingLayer.resetMatrix();
    }


    drawWithoutMatrixManipulation(renderingLayer: IRenderingLayer) {
        const ctx = renderingLayer.getRenderingContext();
        const pxs = renderingLayer.pixelScale;

        const t = this.transform;

        const width = this.width > 0 ? this.width : 0;
        const height = this.height > 0 ? this.height : 0;

        const x = -t.origin.x + width / 2;
        const y = -t.origin.y + height / 2;

        const radiusX = width / 2;
        const radiusY = height / 2;

        const innerRadius = Utils.Numbers.limit(this.innerRadius, 0, 1);

        const innerRadiusX = radiusX * innerRadius;
        const innerRadiusY = radiusY * innerRadius;

        let startAngle = this.startAngle.radians - Math.PI / 2;
        let endAngle = this.endAngle.radians - Math.PI / 2;

        if (endAngle - startAngle > Math.PI * 2) {
            endAngle = Math.PI * 2 + startAngle;
        }

        ctx.beginPath();
        ctx.ellipse(
            x * pxs,
            y * pxs,
            radiusX * pxs,
            radiusY * pxs,
            0, startAngle, endAngle
        );
        ctx.ellipse(
            x * pxs,
            y * pxs,
            innerRadiusX * pxs,
            innerRadiusY * pxs,
            0, endAngle, startAngle, true
        );
        ctx.closePath();
    }


    draw(renderingLayer: IRenderingLayer) {
        this.contructMatrix(renderingLayer);
        this.drawWithoutMatrixManipulation(renderingLayer);
        this.destructMatrix(renderingLayer);
    }


    getBoundingBox(renderingLayer: IRenderingLayer): IBoxArea {
        return {
            origin: this.transform.origin.clone(),
            size: new Vector(this.width, this.height),
        }
    }

}