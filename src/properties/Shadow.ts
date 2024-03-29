import { type IColorRGBA, Color } from "../styles/Color";
import { Vector, type VectorType } from "../units/Vector";
import { type IBoundingBox } from "../renderables/IBoundingBox";
import { type IClonable } from "../core/IClonable";
import { type IRenderingLayer } from "../core/RenderingLayer";


export class Shadow implements IClonable<Shadow> {

    color: IColorRGBA = Color.Black;
    offset: Vector = Vector.Zero;
    blur: number = 0;


    constructor(color: IColorRGBA, offset: VectorType, blur: number) {
        this.color = color;
        this.offset = new Vector(offset);
        this.blur = blur;
    }


    apply(renderingLayer: IRenderingLayer, boundingBox: IBoundingBox): void {
        const ctx = renderingLayer.getRenderingContext();
        const pxs = renderingLayer.pixelScale;

        ctx.shadowColor = Color.convertRGBAtoStyle(this.color);
        ctx.shadowBlur = this.blur * pxs;
        ctx.shadowOffsetX = this.offset.x * pxs;
        ctx.shadowOffsetY = this.offset.y * pxs;
    }


    clone(): Shadow {
        const thisColor = this.color as any;
        const color = thisColor.hasOwnProperty('clone') ? thisColor.clone() : { ...this.color };

        return new Shadow(color, this.offset.clone(), this.blur);
    }


    static clear(renderingLayer: IRenderingLayer) {
        const ctx = renderingLayer.getRenderingContext();

        ctx.shadowBlur = 0;
        ctx.shadowColor = 'transparent';
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
    }
}