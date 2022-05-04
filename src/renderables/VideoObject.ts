import { Gizmo } from "../debugger/Gizmo";
import { Numbers } from "@templatone/utils";
import { Shadow } from "../properties/Shadow";
import { Transform } from "../properties/Transform";
import { Vector } from "../units/Vector";
import { type IBoundingBox } from "./IBoundingBox";
import { type IClonable } from "../core/IClonable";
import { type IObject } from "./IObject";
import { type IRenderable } from "./IRenderable";
import { type IRenderingLayer } from "../core/RenderingLayer";
import { type IVisible } from "./IVisible";
import { type ValueModifierType } from "../helpers/valueModifier";


type TimeEntry =
    | [seconds: number]
    | [frames: number, fps: number];


type ConstructorEntry =
    | [source: HTMLVideoElement]
    | [source: HTMLVideoElement, width: number, height: number]
    | [source: HTMLVideoElement, width: number, height: number, crop: {
        x: number,
        y: number,
        width: number,
        height: number
    }]


export class VideoObject implements IObject, IRenderable, IVisible, IClonable<VideoObject> {

    readonly source: HTMLVideoElement;

    readonly width: number;
    readonly height: number;

    #crop: {
        x: number,
        y: number,
        width: number,
        height: number
    };

    transform: Transform = new Transform();

    shadow: Shadow | null = null;
    opacity: number = 1;


    constructor(...entry: ConstructorEntry) {
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


    getBoundingBox(renderingLayer: IRenderingLayer): IBoundingBox {
        return {
            origin: this.transform.origin.clone(),
            size: new Vector(this.width, this.height),
        }
    }


    setTime(...entry: TimeEntry) {
        const miliseconds = (() => {
            if (entry.length == 1) {
                const [seconds] = entry;
                return seconds * 1_000;
            } else {
                const [frames, fps] = entry;
                return frames * 1_000 / fps;
            }
        })();

        this.source.currentTime = miliseconds / 1_000;
    }


    render(renderingLayer: IRenderingLayer) {
        const ctx = renderingLayer.getRenderingContext();
        const pxs = renderingLayer.pixelScale;

        const t = this.transform;

        renderingLayer.setMatrixToTransform(t);

        ctx.globalAlpha = Numbers.limit(this.opacity, 0, 1);

        if (this.shadow) {
            this.shadow.apply(renderingLayer, this.getBoundingBox(renderingLayer));
        } else {
            Shadow.clear(renderingLayer);
        }

        ctx.translate(-t.origin.x * pxs, -t.origin.y * pxs);
        // ctx.drawImage(this.source, 0, 0, this.width * pxs, this.height * pxs);
        ctx.drawImage(
            this.source,
            this.#crop.x * pxs, this.#crop.y * pxs,
            this.#crop.width * pxs, this.#crop.height * pxs,
            0, 0,
            this.#crop.width * pxs,this.#crop.height * pxs
        );

        renderingLayer.resetMatrix();

        ctx.globalAlpha = 1;

        if (renderingLayer.gizmoVisibility && this.renderGizmo) this.renderGizmo(renderingLayer);
    }


    renderGizmo(renderingLayer: IRenderingLayer) {
        renderingLayer.setMatrixToTransform(this.transform);
        Gizmo.origin(renderingLayer, Vector.Zero, Gizmo.mediaColor);
        renderingLayer.resetMatrix();
    }


    clone(): VideoObject {
        const image = new VideoObject(this.source, this.width, this.height);
        image.transform = this.transform.clone();
        image.shadow = this.shadow?.clone() ?? null;
        image.opacity = this.opacity;

        return image;
    }
}