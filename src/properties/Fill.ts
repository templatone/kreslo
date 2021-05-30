import { Color } from "../styles/Color.js";
import { Style, EntryStyleType } from "../styles/Style.js";
import type { IBoundingBox } from "../renderables/IBoundingBox.js";
import type { IClonable } from "../core/IClonable.js";
import type { IRenderingLayer } from "../core/RenderingLayer.js";


export class Fill extends Style implements IClonable<Fill> {

    constructor(style: EntryStyleType = Color.Grey) {
        super(style);
    }


    apply(renderingLayer: IRenderingLayer, boundingBox: IBoundingBox): void {
        const ctx = renderingLayer.getRenderingContext();

        ctx.fillStyle = this.computeStyle(renderingLayer, boundingBox);
    }


    clone(): Fill {
        const style = super.clone();

        return new Fill(style);
    }


    static clear(renderingLayer: IRenderingLayer) {
        const ctx = renderingLayer.getRenderingContext();

        ctx.fillStyle = 'transparent';
    }
}