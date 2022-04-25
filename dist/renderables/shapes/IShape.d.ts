import { type Fill } from "../../properties/Fill";
import { type IBoundingBox } from "../IBoundingBox";
import { type IRenderingLayer } from "../../core/RenderingLayer";
import { type IVisible } from "../IVisible";
import { type Stroke } from "../../properties/Stroke";
export interface IShape extends IVisible {
    fill: Fill | null;
    stroke: Stroke | null;
    getBoundingBox: GetBoundingBoxCallbackType;
}
export declare type GetBoundingBoxCallbackType = {
    (renderingLayer: IRenderingLayer): IBoundingBox;
};
