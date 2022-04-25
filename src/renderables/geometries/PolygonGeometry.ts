import { type IVector, Vector } from "../../units/mod";
import { type Transform } from "../../properties/mod";
import { type IBoundingBox } from "../IBoundingBox";
import { Geometry } from "./Geometry";


export class PolygonGeometry extends Geometry {


    constructor(...points: IVector[]) {
        const d = (ctx: CanvasRenderingContext2D, pxs: number, t: Transform) => {
            ctx.beginPath();
            
            const p = points[0];
            const x = -t.origin.x * pxs + p.x * pxs;
            const y = -t.origin.y * pxs + p.y * pxs;

            ctx.moveTo(x, y);

            for (let i = 1; i < points.length; i++) {
                const p = points[i];
                const x = -t.origin.x * pxs + p.x * pxs;
                const y = -t.origin.y * pxs + p.y * pxs;

                ctx.lineTo(x, y);
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
    }
}