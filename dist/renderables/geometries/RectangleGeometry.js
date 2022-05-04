import { Vector } from "../../units/mod";
import { Geometry } from "./Geometry";
export class RectangleGeometry extends Geometry {
    width;
    height;
    constructor(width, height) {
        const draw = (ctx, pxs, t) => {
            const width = this.width > 0 ? this.width : 0;
            const height = this.height > 0 ? this.height : 0;
            ctx.beginPath();
            ctx.rect(-t.origin.x * pxs, -t.origin.y * pxs, width * pxs, height * pxs);
            ctx.closePath();
        };
        const getBoundingBox = (t) => {
            return {
                origin: t.origin.clone(),
                size: new Vector(this.width, this.height),
            };
        };
        super(draw, getBoundingBox);
        this.width = width;
        this.height = height;
    }
    clone() {
        return new RectangleGeometry(this.width, this.height);
    }
}
