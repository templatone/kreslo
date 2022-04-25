import { PolygonGeometry } from "../geometries/mod";
import type { Fill } from "../../properties/Fill";
import type { IRenderable } from "../IRenderable";
import type { IRenderingLayer } from "../../core/RenderingLayer";
import type { IShape } from "./IShape";
import type { IVector } from "../../units/Vector";
import type { Shadow } from "../../properties/Shadow";
import type { Stroke } from "../../properties/Stroke";
export declare class PolygonShape extends PolygonGeometry implements IRenderable, IShape {
    fill: Fill | null;
    stroke: Stroke | null;
    shadow: Shadow | null;
    opacity: number;
    constructor(...points: IVector[]);
    render(renderingLayer: IRenderingLayer): void;
    renderGizmo(renderingLayer: IRenderingLayer): void;
}
