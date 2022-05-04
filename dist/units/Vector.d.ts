import { Angle, EntryAngleType } from "./Angle";
import { type IClonable } from "../core/IClonable";
export interface IVector {
    x: number;
    y: number;
}
export declare class Vector implements IVector, IClonable<Vector> {
    x: number;
    y: number;
    get length(): number;
    constructor(...values: EntryVectorType);
    set(...values: EntryVectorType): Vector;
    add(...values: EntryVectorType): Vector;
    subtract(...values: EntryVectorType): Vector;
    multiple(...values: EntryVectorModifierType): Vector;
    divide(...values: EntryVectorModifierType): Vector;
    rotate(...values: EntryAngleType): Vector;
    /**
     * Normalize the Vector to length equal 1.
     * @returns Same Vector object.
     */
    normalize(): Vector;
    /**
     * TODO: Add description
     * @returns Same Vector object.
     */
    absolute(): Vector;
    /**
     * TODO: Add description
     */
    isEquals(vector: Vector): boolean;
    /**
     * Convert the Vector to Angle
     * @returns New instance of Angle
     */
    getAngle(): Angle;
    /**
     * Clone the Vector without references
     * @returns New instance of Vector
     */
    clone(): Vector;
    /**
     * Alias for `new Vector(0, 0);`
     * @returns New instance of Vector
     */
    static get Zero(): Vector;
    /**
     * Alias for `new Vector(.5, .5);`
     * @returns New instance of Vector
     */
    static get Half(): Vector;
    /**
     * Alias for `new Vector(1, 1);`
     * @returns New instance of Vector
     */
    static get One(): Vector;
    /**
      * Alias for `new Vector(0, -1);`
      * @returns New instance of Vector
      */
    static get Top(): Vector;
    /**
      * Alias for `new Vector(0, 1);`
      * @returns New instance of Vector
      */
    static get Bottom(): Vector;
    /**
      * Alias for `new Vector(-1, 0);`
      * @returns New instance of Vector
      */
    static get Left(): Vector;
    /**
      * Alias for `new Vector(1, 0);`
      * @returns New instance of Vector
      */
    static get right(): Vector;
    static distance(vector1: IVector, vector2: IVector): number;
    private static _parseEntry_Vector;
    private static _parseEntryType_VectorModifier;
}
export declare type VectorType = [x: number, y: number] | IVector;
declare type EntryVectorType = [x: number, y: number] | [vector: VectorType];
export declare type EntryVectorModifierType = [...EntryVectorType] | [scalar: number];
export {};
