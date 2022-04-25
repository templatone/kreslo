import { TrimablePolygonGeometry } from "../geometries/mod";
import { type Fill } from "../../properties/Fill";
import { type IRenderable } from "../IRenderable";
import { type IRenderingLayer } from "../../core/RenderingLayer";
import { type IShape } from "./IShape";
import { type IVector } from "../../units/Vector";
import { type Shadow } from "../../properties/Shadow";
import { type Stroke } from "../../properties/Stroke";
export declare class TrimablePolygonShape extends TrimablePolygonGeometry implements IRenderable, IShape {
    fill: Fill | null;
    stroke: Stroke | null;
    shadow: Shadow | null;
    opacity: number;
    constructor(points: IVector[], closed?: boolean, trimStart?: number, trimEnd?: number, trimOffset?: number);
    render(renderingLayer: IRenderingLayer): void;
    renderGizmo(renderingLayer: IRenderingLayer): void;
}
