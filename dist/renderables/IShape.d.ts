import { Fill } from "../properties/Fill.js";
import { IBoundingBox } from "./IBoundingBox.js";
import { IRenderingLayer } from "../core/RenderingLayer.js";
import { IVisible } from "./IVisible.js";
import { Stroke } from "../properties/Stroke.js";
export interface IShape extends IVisible {
    fill: Fill | null;
    stroke: Stroke | null;
    getBoundingBox: getBoundingBox;
}
export declare type getBoundingBox = {
    (renderingLayer: IRenderingLayer): IBoundingBox;
};
