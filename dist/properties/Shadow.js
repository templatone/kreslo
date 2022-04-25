import { Color } from "../styles/Color";
import { Vector } from "../units/Vector";
export class Shadow {
    color = Color.Black;
    offset = Vector.Zero;
    blur = 0;
    constructor(color, offset, blur) {
        this.color = color;
        this.offset = offset;
        this.blur = blur;
    }
    apply(renderingLayer, boundingBox) {
        const ctx = renderingLayer.getRenderingContext();
        const pxs = renderingLayer.pixelScale;
        ctx.shadowColor = Color.convertRGBAtoStyle(this.color);
        ctx.shadowBlur = this.blur * pxs;
        ctx.shadowOffsetX = this.offset.x * pxs;
        ctx.shadowOffsetY = this.offset.y * pxs;
    }
    clone() {
        const thisColor = this.color;
        const color = thisColor.hasOwnProperty('clone') ? thisColor.clone() : { ...this.color };
        return new Shadow(color, this.offset.clone(), this.blur);
    }
    static clear(renderingLayer) {
        const ctx = renderingLayer.getRenderingContext();
        ctx.shadowBlur = 0;
        ctx.shadowColor = 'transparent';
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
    }
}
