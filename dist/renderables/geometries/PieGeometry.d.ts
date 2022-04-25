import { type Angle } from "../../units/mod";
import { Geometry } from "./Geometry";
export declare class PieGeometry extends Geometry {
    width: number;
    height: number;
    startAngle: Angle;
    endAngle: Angle;
    innerRadius: number;
    constructor(width: number, height: number, startAngle: Angle, endAngle: Angle, innerRadius: number);
}
