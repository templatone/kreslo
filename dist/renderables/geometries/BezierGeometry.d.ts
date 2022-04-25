import { type BezierPoint } from "../../units/mod";
import { Geometry } from "./Geometry";
export declare class BezierGeometry extends Geometry {
    points: BezierPoint[];
    constructor(...points: BezierPoint[]);
}
