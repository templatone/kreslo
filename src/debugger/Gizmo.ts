import { type IRenderingLayer } from "../core/mod";
import { type IVector } from "../units/Vector";


export class Gizmo {
    static nullColor = "white";
    static shapeColor = "cyan";
    static mediaColor = "magenta";
    static textColor = "yellow";

    static origin(renderingLayer: IRenderingLayer, position: IVector, color: string = "#000") {
        const ctx = renderingLayer.getRenderingContext();
        const pxs = renderingLayer.pixelScale;

        const scale = renderingLayer.gizmoScale;

        const fillStyle = ctx.fillStyle;

        const crossLineWidth = 16 * scale;
        const crossLineHeight = 2 * scale;

        const dotSize = 4 * scale;

        ctx.beginPath();
        ctx.rect(
            -(crossLineWidth / 2 + 1) * pxs,
            -(crossLineHeight / 2 + 1) * pxs,
            (crossLineWidth + 2) * pxs,
            (crossLineHeight + 2) * pxs
        );
        ctx.rect(
            -(crossLineHeight / 2 + 1) * pxs,
            -(crossLineWidth / 2 + 1) * pxs,
            (crossLineHeight + 2) * pxs,
            (crossLineWidth + 2) * pxs
        );
        ctx.rect(
            -(dotSize / 2 + crossLineHeight + 1) * pxs,
            -(dotSize / 2 + crossLineHeight + 1) * pxs,
            (dotSize + crossLineHeight * 2 + 2) * pxs,
            (dotSize + crossLineHeight * 2 + 2) * pxs
        );
        ctx.closePath();
        ctx.fillStyle = 'rgba(255, 255, 255, .6)';
        ctx.fill();

        ctx.beginPath();
        ctx.rect(
            (-crossLineWidth / 2) * pxs,
            (-crossLineHeight / 2) * pxs,
            crossLineWidth * pxs,
            crossLineHeight * pxs
        );
        ctx.rect(
            (-crossLineHeight / 2) * pxs,
            (-crossLineWidth / 2) * pxs,
            crossLineHeight * pxs,
            crossLineWidth * pxs,
        );
        ctx.rect(
            -(dotSize / 2 + crossLineHeight) * pxs,
            -(dotSize / 2 + crossLineHeight) * pxs,
            (dotSize + crossLineHeight * 2) * pxs,
            (dotSize + crossLineHeight * 2) * pxs
        );
        ctx.closePath();
        ctx.fillStyle = '#222';
        ctx.fill();

        ctx.fillStyle = color;
        ctx.fillRect(
            (-dotSize / 2) * pxs,
            (-dotSize / 2) * pxs,
            dotSize * pxs,
            dotSize * pxs
        );

        ctx.fillStyle = fillStyle;
    }
}