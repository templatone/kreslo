import { Color } from "../styles/Color";
import { Style } from "../styles/Style";
export class Fill extends Style {
    constructor(style = Color.Grey) {
        super(style);
    }
    apply(renderingLayer, boundingBox) {
        const ctx = renderingLayer.getRenderingContext();
        ctx.fillStyle = this.computeStyle(renderingLayer, boundingBox);
    }
    clone() {
        const style = super.clone();
        return new Fill(style);
    }
    static clear(renderingLayer) {
        const ctx = renderingLayer.getRenderingContext();
        ctx.fillStyle = 'transparent';
    }
}
