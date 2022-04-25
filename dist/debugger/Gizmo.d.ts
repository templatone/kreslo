import { type IRenderingLayer } from "../core/mod";
import { type IVector } from "../units/Vector";
export declare class Gizmo {
    static nullColor: string;
    static shapeColor: string;
    static mediaColor: string;
    static textColor: string;
    static origin(renderingLayer: IRenderingLayer, position: IVector, color?: string): void;
}
