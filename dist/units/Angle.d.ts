import { IClonable } from "../core/IClonable.js";
import { Vector } from "./Vector.js";
export declare class Angle implements IClonable<Angle> {
    degrees: number;
    get revolutions(): number;
    set revolutions(revolutions: number);
    get radians(): number;
    set radians(radians: number);
    constructor(...values: AngleEntry);
    set(...values: AngleEntry): void;
    /**
     * Add to angle
     * @param {Angle|number} value Angle or number (degrees)
     * @returns {Angle} Same Angle object.
     */
    add(...values: AngleEntry): Angle;
    /**
     * Subtract of angle
     * @param {Angle|number} value Angle or number (degrees)
     * @returns {Angle} Same Angle object.
     */
    subtract(...values: AngleEntry): Angle;
    /**
     * Multiply the angle
     * @param {Angle|number} value Angle or number (degrees)
     * @returns {Angle} Same Angle object.
     */
    multiply(...values: AngleEntry): Angle;
    /**
     * Divide the angle
     * @param {Angle|number} value Angle or number (degrees)
     * @returns {Angle} Same Angle object.
     */
    divide(...values: AngleEntry): Angle;
    normalize(): Angle;
    getVector(): Vector;
    getCSSValue(): string;
    clone(): Angle;
    static fromDegrees(degrees: number): Angle;
    static fromRadians(radians: number): Angle;
    static fromRevolutions(revolutions: number): Angle;
    static get Zero(): Angle;
    static get Quarter(): Angle;
    static get Third(): Angle;
    static get Half(): Angle;
    static get Full(): Angle;
    /**
     * Convert degrees to radians
     * @param degrees
     */
    static degreesToRadians(degrees: number): number;
    /**
     * Convert radians to degrees
     * @param radians
     */
    static radiansToDegress(radians: number): number;
    /**
     * Convert degrees to revolutions
     * @param degrees
     */
    static degreesToRevelutions(degrees: number): number;
    /**
     * Convert revolutions to degrees
     * @param revolutions
     */
    static revelutionsToDegress(revolutions: number): number;
    /**
     * Convert radians to revolutions
     * @param radians
     */
    static radiansToRevelutions(radians: number): number;
    /**
     * Convert revolutions to radians
     * @param revolutions
     */
    static revelutionsToRadians(revolutions: number): number;
}
export declare type AngleEntry = [degrees: number] | [angle: Angle];
