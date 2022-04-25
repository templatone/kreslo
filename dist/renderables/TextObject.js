import { Color } from "../styles/Color";
import { Fill } from "../properties/Fill";
import { Font } from "../properties/Font";
import { Gizmo } from "../debugger/Gizmo";
import { Numbers, Regex } from "@templatone/utils";
import { Shadow } from "../properties/Shadow";
import { Stroke } from "../properties/Stroke";
import { Transform } from "../properties/Transform";
import { Vector } from "../units/Vector";
export class TextObject {
    transform = new Transform();
    _contentLines = [];
    get content() {
        return this._contentLines.join('\n');
    }
    set content(content) {
        this._contentLines = content.split(Regex.breakLines());
    }
    fill = new Fill(Color.Black);
    stroke = null;
    font = new Font();
    shadow = null;
    opacity = 1;
    constructor(content) {
        this.content = content;
    }
    getBoundingBox(renderingLayer) {
        this.font.apply(renderingLayer);
        const ctx = renderingLayer.getRenderingContext();
        let width = 0;
        let height = 0;
        this._contentLines.forEach((line, i) => {
            const w = ctx.measureText(line).width;
            if (width < w)
                width = w;
            height += this.font.lineHeight;
        });
        return {
            origin: this.transform.origin.clone(),
            size: new Vector(Math.ceil(width), Math.ceil(height)),
        };
    }
    render(renderingLayer) {
        const ctx = renderingLayer.getRenderingContext();
        const pxs = renderingLayer.pixelScale;
        const t = this.transform;
        ctx.globalAlpha = Numbers.limit(this.opacity, 0, 1);
        renderingLayer.setMatrixToTransform(t);
        ctx.moveTo(-t.origin.x, -t.origin.y);
        this.font.apply(renderingLayer);
        const lineheight = this.font.lineHeight * pxs;
        this._contentLines.forEach((line, i) => {
            if (this.shadow) {
                this.shadow.apply(renderingLayer, this.getBoundingBox(renderingLayer));
            }
            else {
                Shadow.clear(renderingLayer);
            }
            if (this.fill) {
                this.fill.apply(renderingLayer, this.getBoundingBox(renderingLayer));
                ctx.fillText(line, 0, (i + 1) * lineheight);
            }
            else {
                Fill.clear(renderingLayer);
            }
            if (this.stroke) {
                this.stroke.apply(renderingLayer, this.getBoundingBox(renderingLayer));
                ctx.strokeText(line, 0, (i + 1) * lineheight);
            }
            else {
                Stroke.clear(renderingLayer);
            }
        });
        renderingLayer.resetMatrix();
        ctx.globalAlpha = 1;
        if (renderingLayer.gizmoVisibility && this.renderGizmo)
            this.renderGizmo(renderingLayer);
    }
    renderGizmo(renderingLayer) {
        renderingLayer.setMatrixToTransform(this.transform);
        Gizmo.origin(renderingLayer, Vector.Zero, Gizmo.textColor);
        renderingLayer.resetMatrix();
    }
    clone() {
        const text = new TextObject(this.content);
        text.transform = this.transform.clone();
        text.fill = this.fill?.clone() ?? null;
        text.stroke = this.stroke?.clone() ?? null;
        text.font = this.font?.clone() ?? null;
        text.shadow = this.shadow?.clone() ?? null;
        text.opacity = this.opacity;
        return text;
    }
}
