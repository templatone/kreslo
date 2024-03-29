import { type Transform } from "../../properties/mod";
import { Vector, type BezierPoint } from "../../units/mod";
import { type IBoundingBox } from "../IBoundingBox";
import { Geometry } from "./Geometry";


export class BezierGeometry extends Geometry {

    points: BezierPoint[];


    constructor(...points: BezierPoint[]) {
        const d = (ctx: CanvasRenderingContext2D, pxs: number, t: Transform) => {
            ctx.beginPath();

            const point = points[points.length - 1];
            const x = pxs * (-t.origin.x + point.x);
            const y = pxs * (-t.origin.y + point.y);

            ctx.moveTo(x, y);

            for (let i = 0; i < points.length; i++) {
                const point1 = i > 0 ? points[i - 1] : points[points.length - 1];
                const point2 = points[i];

                const cp1x = point1.x + point1.endControl.x;
                const cp1y = point1.y + point1.endControl.y;
                const cp2x = point2.x + point2.startControl.x;
                const cp2y = point2.y + point2.startControl.y;
                const x = point2.x;
                const y = point2.y;

                ctx.bezierCurveTo(
                    pxs * (-t.origin.x + cp1x),
                    pxs * (-t.origin.x + cp1y),
                    pxs * (-t.origin.x + cp2x),
                    pxs * (-t.origin.x + cp2y),
                    pxs * (-t.origin.x + x),
                    pxs * (-t.origin.x + y),
                );
            }

            ctx.closePath();
        }

        const b = (t: Transform): IBoundingBox => {
            const min: Vector = Vector.Zero;
            const max: Vector = Vector.Zero;

            points.forEach(p => {
                min.x = Math.min(min.x, p.x);
                min.y = Math.min(min.y, p.y);
                max.x = Math.max(max.x, p.x);
                max.y = Math.max(max.y, p.y);
            });

            return {
                origin: t.origin.clone().add(min),
                size: max.subtract(min),
            }
        }

        super(d, b);

        this.points = points;
    }
}