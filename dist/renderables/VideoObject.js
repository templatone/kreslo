import { Gizmo } from "../debugger/Gizmo";
import { Numbers } from "@templatone/utils";
import { Shadow } from "../properties/Shadow";
import { Transform } from "../properties/Transform";
import { Vector } from "../units/Vector";
export class VideoObject {
    source;
    width;
    height;
    transform = new Transform();
    shadow = null;
    opacity = 1;
    constructor(source, width, height) {
        if (width != undefined && height != undefined) {
            this.width = typeof width == 'number' ? width : width(source.width);
            this.height = typeof height == 'number' ? height : height(source.height);
        }
        else {
            this.width = source.width;
            this.height = source.height;
        }
        this.source = source;
    }
    getBoundingBox(renderingLayer) {
        return {
            origin: this.transform.origin.clone(),
            size: new Vector(this.width, this.height),
        };
    }
    setTime(...entry) {
        const miliseconds = (() => {
            if (entry.length == 1) {
                const [seconds] = entry;
                return seconds * 1_000;
            }
            else {
                const [frames, fps] = entry;
                return frames * 1_000 / fps;
            }
        })();
        this.source.currentTime = miliseconds / 1_000;
    }
    render(renderingLayer) {
        const ctx = renderingLayer.getRenderingContext();
        const pxs = renderingLayer.pixelScale;
        const t = this.transform;
        renderingLayer.setMatrixToTransform(t);
        ctx.globalAlpha = Numbers.limit(this.opacity, 0, 1);
        if (this.shadow) {
            this.shadow.apply(renderingLayer, this.getBoundingBox(renderingLayer));
        }
        else {
            Shadow.clear(renderingLayer);
        }
        ctx.translate(-t.origin.x * pxs, -t.origin.y * pxs);
        ctx.drawImage(this.source, 0, 0, this.width * pxs, this.height * pxs);
        renderingLayer.resetMatrix();
        ctx.globalAlpha = 1;
        if (renderingLayer.gizmoVisibility && this.renderGizmo)
            this.renderGizmo(renderingLayer);
    }
    renderGizmo(renderingLayer) {
        renderingLayer.setMatrixToTransform(this.transform);
        Gizmo.origin(renderingLayer, Vector.Zero, Gizmo.mediaColor);
        renderingLayer.resetMatrix();
    }
    clone() {
        const image = new VideoObject(this.source, this.width, this.height);
        image.transform = this.transform.clone();
        image.shadow = this.shadow?.clone() ?? null;
        image.opacity = this.opacity;
        return image;
    }
}
