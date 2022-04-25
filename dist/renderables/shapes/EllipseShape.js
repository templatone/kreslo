import { EllipseGeometry } from "../geometries/EllipseGeometry";
import { Shape } from "./Shape";
export class EllipseShape extends EllipseGeometry {
    fill = null;
    stroke = null;
    shadow = null;
    opacity = 1;
    constructor(width, height) {
        super(width, height);
    }
    render(renderingLayer) {
        Shape.renderObject(renderingLayer, this, this, this);
    }
    renderGizmo(renderingLayer) {
        Shape.renderGizmo(renderingLayer, this);
    }
    clone() {
        const ellipse = new EllipseShape(this.width, this.height);
        ellipse.fill = this.fill?.clone() ?? null;
        ellipse.stroke = this.stroke?.clone() ?? null;
        ellipse.shadow = this.shadow?.clone() ?? null;
        ellipse.opacity = this.opacity;
        return ellipse;
    }
}
