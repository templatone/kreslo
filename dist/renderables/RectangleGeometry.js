import {Geometry} from "./Geometry.js";
import {Vector} from "../units/Vector.js";
export class RectangleGeometry extends Geometry {
  constructor(width, height) {
    const d = (ctx, pxs, t) => {
      const width2 = this.width > 0 ? this.width : 0;
      const height2 = this.height > 0 ? this.height : 0;
      ctx.beginPath();
      ctx.rect(-t.origin.x * pxs, -t.origin.y * pxs, width2 * pxs, height2 * pxs);
      ctx.closePath();
    };
    const b = (t) => {
      return {
        origin: t.origin.clone(),
        size: new Vector(this.width, this.height)
      };
    };
    super(d, b);
    this.width = width;
    this.height = height;
  }
  clone() {
    return new RectangleGeometry(this.width, this.height);
  }
}
