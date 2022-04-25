import { type IVector, Vector } from "./Vector";
import { type IClonable } from "../core/IClonable";
export declare class BezierPoint extends Vector implements IClonable<BezierPoint> {
    startControl: Vector;
    endControl: Vector;
    constructor(position: IVector, startControl?: IVector, endControl?: IVector);
    toVector(): Vector;
    clone(): BezierPoint;
}
