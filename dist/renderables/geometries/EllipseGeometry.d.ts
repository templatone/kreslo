import { type IClonable } from "../../core/mod";
import { Geometry } from "./Geometry";
export declare class EllipseGeometry extends Geometry implements IClonable<EllipseGeometry> {
    width: number;
    height: number;
    constructor(width: number, height: number);
    clone(): EllipseGeometry;
}
