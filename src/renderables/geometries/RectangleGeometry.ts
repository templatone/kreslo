import { type IClonable } from "../../core/mod";
import { Vector } from "../../units/mod";
import { type Transform } from "../../properties/mod";
import { type IBoundingBox } from "../IBoundingBox";
import { Geometry } from "./Geometry";


export class RectangleGeometry extends Geometry implements IClonable<RectangleGeometry> {

    width: number;
    height: number;


    constructor(width: number, height: number) {
        const draw = (ctx: CanvasRenderingContext2D, pxs: number, t: Transform) => {
            const width = this.width > 0 ? this.width : 0;
            const height = this.height > 0 ? this.height : 0;

            ctx.beginPath();
            ctx.rect(
                -t.origin.x * pxs,
                -t.origin.y * pxs,
                width * pxs,
                height * pxs
            );
            ctx.closePath();
        }

        const getBoundingBox = (t: Transform): IBoundingBox => {
            return {
                origin: t.origin.clone(),
                size: new Vector(this.width, this.height),
            }
        }

        super(draw, getBoundingBox);

        this.width = width;
        this.height = height;
    }


    clone(): RectangleGeometry {
        return new RectangleGeometry(this.width, this.height);
    }

}