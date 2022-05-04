import { Gizmo } from "../debugger/Gizmo";
import { Numbers } from "@templatone/utils";
import { Shadow } from "../properties/Shadow";
import { Transform } from "../properties/Transform";
import { Vector } from "../units/Vector";
export class VideoObject {
    source;
    width;
    height;
    #crop;
    transform = new Transform();
    shadow = null;
    opacity = 1;
    constructor(...entry) {
        const [source, width, height, crop] = entry;
        this.width = width ?? source.width;
        this.height = height ?? source.height;
        this.#crop = crop ?? {
            x: 0,
            y: 0,
            width: this.width,
            height: this.height
        };
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
        ctx.drawImage(this.source, this.#crop.x, // sx
        this.#crop.y, // sy
        this.#crop.width, // sw
        this.#crop.height, // sh
        0, // dx
        0, // dy
        this.#crop.width * pxs, // dw
        this.#crop.height * pxs // dh
        );
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
