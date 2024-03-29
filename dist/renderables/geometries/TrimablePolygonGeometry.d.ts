import { Geometry } from "./Geometry";
import { type IVector } from "../../units/mod";
export declare class TrimablePolygonGeometry extends Geometry {
    points: IVector[];
    closed: boolean;
    trimEnd: number;
    trimStart: number;
    trimOffset: number;
    constructor(points: IVector[], closed?: boolean, trimStart?: number, trimEnd?: number, trimOffset?: number);
    private _draw;
    private _drawSide;
}
