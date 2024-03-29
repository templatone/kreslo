import { Vector } from "../../units/mod";
import { type Transform } from "../../properties/mod";
import { type IClonable } from "../../core/mod";
import { Geometry } from "./Geometry";
import { type IBoundingBox } from "../IBoundingBox";


export class EllipseGeometry extends Geometry implements IClonable<EllipseGeometry> {

    width: number;
    height: number;

    constructor(width: number, height: number) {
        const d = (ctx: CanvasRenderingContext2D, pxs: number, t: Transform) => {
            const width = (this.width > 0 ? this.width : 0);
            const height = (this.height > 0 ? this.height : 0);

            const x = -t.origin.x + width / 2;
            const y = -t.origin.y + height / 2;

            const radiusX = width / 2;
            const radiusY = height / 2;

            ctx.beginPath();
            ctx.ellipse(
                x * pxs,
                y * pxs,
                radiusX * pxs,
                radiusY * pxs,
                0, 0, 2 * Math.PI
            );
            ctx.closePath();
        }

        const b = (t: Transform): IBoundingBox => {
            return {
                origin: t.origin.clone(),
                size: new Vector(this.width, this.height),
            }
        }

        super(d, b);

        this.width = width;
        this.height = height;
    }


    clone(): EllipseGeometry {
        return new EllipseGeometry(this.width, this.height);
    }

}