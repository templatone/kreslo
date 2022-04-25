import { type IClonable } from "../../core/mod";
import { Geometry } from "./Geometry";
export declare class RectangleGeometry extends Geometry implements IClonable<RectangleGeometry> {
    width: number;
    height: number;
    constructor(width: number, height: number);
    clone(): RectangleGeometry;
}
