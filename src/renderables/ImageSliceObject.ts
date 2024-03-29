import { Gizmo } from "../debugger/Gizmo";
import { Numbers } from "@templatone/utils";
import { Transform } from "../properties/Transform";
import { Vector } from "../units/Vector";
import { type IBoundingBox } from "./IBoundingBox";
import { type IObject } from "./IObject";
import { type IRenderable } from "./IRenderable";
import { type IRenderingLayer } from "../core/RenderingLayer";
import { type IVisible } from "./IVisible";
import { type Shadow } from "../properties/Shadow";


/** @internal */
export class ImageSliceObject implements IObject, IRenderable, IVisible {

    readonly source: HTMLImageElement;

    readonly width: number;
    readonly height: number;

    sliceX: number;
    sliceY: number;
    sliceWidth: number;
    sliceHeight: number;

    transform: Transform = new Transform();

    shadow: Shadow | null = null;
    opacity: number = 1;


    constructor(source: HTMLImageElement, sliceX: number, sliceY: number, sliceWidth: number, sliceHeight: number) {
        if (source.naturalWidth == 0 || source.naturalHeight == 0) {
            throw new Error("The image is not fully loaded.");
        }

        this.width = sliceWidth;
        this.height = sliceHeight;

        this.sliceX = sliceX;
        this.sliceY = sliceY;

        this.sliceWidth = sliceWidth;
        this.sliceHeight = sliceHeight;

        this.source = source;
    }


    getBoundingBox(renderingLayer: IRenderingLayer): IBoundingBox {
        return {
            origin: this.transform.origin.clone(),
            size: new Vector(this.width, this.height),
        }
    }


    render(renderingLayer: IRenderingLayer) {
        const ctx = renderingLayer.getRenderingContext();
        const pxs = renderingLayer.pixelScale;

        const t = this.transform;

        ctx.globalAlpha = Numbers.limit(this.opacity, 0, 1);

        renderingLayer.setMatrixToTransform(t);

        ctx.moveTo(-t.origin.x * pxs, -t.origin.y * pxs);
        ctx.drawImage(this.source, this.sliceX, this.sliceY, this.sliceWidth, this.sliceHeight, 0, 0, this.width * pxs, this.height * pxs);

        renderingLayer.resetMatrix();

        ctx.globalAlpha = 1;

        if (renderingLayer.gizmoVisibility && this.renderGizmo) this.renderGizmo(renderingLayer);
    }


    renderGizmo(renderingLayer: IRenderingLayer) {
        renderingLayer.setMatrixToTransform(this.transform);
        Gizmo.origin(renderingLayer, Vector.Zero, Gizmo.mediaColor);
        renderingLayer.resetMatrix();
    }


    getImageElement(): HTMLImageElement {
        const canvas = document.createElement('canvas');
        canvas.width = this.width;
        canvas.height = this.height;

        document.body.appendChild(canvas);

        const ctx = canvas.getContext('2d')! as CanvasRenderingContext2D;

        ctx.drawImage(this.source, this.sliceX, this.sliceY, this.sliceWidth, this.sliceHeight, 0, 0, this.width, this.height);

        const dataURL = canvas.toDataURL('image/png');

        const imageElement = document.createElement('img');
        imageElement.src = dataURL;

        return imageElement;
    }
}