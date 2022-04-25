import { Fill } from "../../properties/Fill";
import { Shadow } from "../../properties/Shadow";
import { Stroke } from "../../properties/Stroke";
import { Transform } from "../../properties/Transform";
import { type GetBoundingBoxCallbackType, IShape } from "./IShape";
import { type IGeometry } from "../geometries/IGeometry";
import { type IRenderable } from "../IRenderable";
import { type IRenderingLayer } from "../../core/RenderingLayer";
export declare class Shape {
    geometry: IGeometry;
    private _getBoundingBox;
    transform: Transform;
    fill: Fill | null;
    stroke: Stroke | null;
    shadow: Shadow | null;
    opacity: number;
    constructor(geometry: IGeometry, getBoundingBox: GetBoundingBoxCallbackType);
    render(renderingLayer: IRenderingLayer): void;
    renderGizmo(renderingLayer: IRenderingLayer): void;
    getBoundingBox(renderingLayer: IRenderingLayer): import("../IBoundingBox").IBoundingBox;
    static applyStyles(renderingLayer: IRenderingLayer, shape: IShape): void;
    static renderObject(renderingLayer: IRenderingLayer, geometry: IGeometry, renderable: IRenderable, shape: IShape): void;
    static renderGizmo(renderingLayer: IRenderingLayer, geometry: IGeometry): void;
}
