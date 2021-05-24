import { IClonable } from "../core/IClonable.js";
import { IVector, Vector } from "./Vector.js";
export declare class BezierPoint extends Vector implements IClonable<BezierPoint> {
    startControl: Vector;
    endControl: Vector;
    constructor(position: IVector, startControl?: IVector, endControl?: IVector);
    toVector(): Vector;
    clone(): BezierPoint;
}
