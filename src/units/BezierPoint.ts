import { type IVector, Vector } from "./Vector";
import { type IClonable } from "../core/IClonable";


export class BezierPoint extends Vector implements IClonable<BezierPoint> {

    startControl: Vector;
    endControl: Vector;


    constructor(position: IVector, startControl: IVector = Vector.Zero, endControl: IVector = Vector.Zero) {
        super(position.x, position.y);

        this.startControl = new Vector(startControl.x, startControl.y);
        this.endControl = new Vector(endControl.x, endControl.y);
    }


    toVector(): Vector {
        return new Vector(this.x, this.y);
    }


    clone(): BezierPoint {
        const startControl = this.startControl.clone();
        const endControl = this.endControl.clone();
        return new BezierPoint({ x: this.x, y: this.y }, startControl, endControl);
    }
}