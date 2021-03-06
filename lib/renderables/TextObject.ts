import { Color } from "../styles/Color.js";
import { Fill } from "../properties/Fill.js";
import { Font } from "../properties/Font.js";
import { Gizmo } from "../debugger/Gizmo.js";
import { IBoundingBox } from "./IBoundingBox.js";
import { IClonable } from "../core/IClonable.js";
import { IObject } from "./IObject.js";
import { IRenderable } from "./IRenderable.js";
import { IRenderingLayer } from "../core/RenderingLayer.js";
import { IShape } from "./IShape.js";
import { Regex } from "../utils/Regex.js";
import { Numbers } from "../utils/Numbers.js";
import { Shadow } from "../properties/Shadow.js";
import { Stroke } from "../properties/Stroke.js";
import { Transform } from "../properties/Transform.js";
import { Vector } from "../units/Vector.js";


export class TextObject implements IObject, IRenderable, IShape, IClonable<TextObject> {

    transform: Transform = new Transform();

    private _contentLines: string[] = [];
    get content(): string {
        return this._contentLines.join('\n');
    }
    set content(content: string) {
        this._contentLines = content.split(Regex.breakLines());
    }

    fill: Fill | null = new Fill(Color.Black);
    stroke: Stroke | null = null;
    font: Font = new Font();

    shadow: Shadow | null = null;
    opacity: number = 1;


    constructor(content: string) {
        this.content = content;
    }


    getBoundingBox(renderingLayer: IRenderingLayer): IBoundingBox {
        this.font.apply(renderingLayer);

        const ctx = renderingLayer.getRenderingContext();

        let width: number = 0;
        let height: number = 0;

        this._contentLines.forEach((line, i) => {
            const w = ctx.measureText(line).width;

            if (width < w) width = w;
            height += this.font.lineHeight
        });

        return {
            origin: this.transform.origin.clone(),
            size: new Vector(Math.ceil(width), Math.ceil(height)),
        }
    }


    render(renderingLayer: IRenderingLayer) {
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
            } else {
                Shadow.clear(renderingLayer);
            }

            if (this.fill) {
                this.fill.apply(renderingLayer, this.getBoundingBox(renderingLayer));
                ctx.fillText(line, 0, (i + 1) * lineheight);
            } else {
                Fill.clear(renderingLayer);
            }

            if (this.stroke) {
                this.stroke.apply(renderingLayer, this.getBoundingBox(renderingLayer));
                ctx.strokeText(line, 0, (i + 1) * lineheight);
            } else {
                Stroke.clear(renderingLayer);
            }
        });

        renderingLayer.resetMatrix();

        ctx.globalAlpha = 1;

        if (renderingLayer.gizmoVisibility && this.renderGizmo) this.renderGizmo(renderingLayer);
    }


    renderGizmo(renderingLayer: IRenderingLayer) {
        renderingLayer.setMatrixToTransform(this.transform);
        Gizmo.origin(renderingLayer, Vector.Zero, Gizmo.textColor);
        renderingLayer.resetMatrix();
    }


    clone(): TextObject {
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