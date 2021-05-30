import type { Angle } from "../units/Angle.js";
import { Geometry } from "./Geometry.js";
export declare class PieGeometry extends Geometry {
    width: number;
    height: number;
    startAngle: Angle;
    endAngle: Angle;
    innerRadius: number;
    constructor(width: number, height: number, startAngle: Angle, endAngle: Angle, innerRadius: number);
}
