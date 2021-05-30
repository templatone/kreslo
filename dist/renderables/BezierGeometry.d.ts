import type { BezierPoint } from "../units/BezierPoint.js";
import { Geometry } from "./Geometry.js";
export declare class BezierGeometry extends Geometry {
    points: BezierPoint[];
    constructor(...points: BezierPoint[]);
}
