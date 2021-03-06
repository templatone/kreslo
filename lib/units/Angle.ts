import { IClonable } from "../core/IClonable.js";
import { Vector } from "./Vector.js";


export type AngleEntry =
    | [degrees: number]
    | [angle: Angle];


export class Angle implements IClonable<Angle> {

    degrees: number;

    get revolutions(): number {
        return Angle.degreesToRevelutions(this.degrees);
    }
    set revolutions(revolutions: number) {
        this.degrees = Angle.revelutionsToDegress(revolutions);
    }


    get radians(): number {
        return Angle.degreesToRadians(this.degrees);
    }
    set radians(radians: number) {
        this.degrees = Angle.radiansToDegress(radians);
    }


    constructor(degrees: number = 0) {
        this.degrees = degrees;
    }


    /**
     * Add to angle
     * @param {Angle|number} value Angle or number (degrees)
     * @returns {Angle} Same Angle object.
     */
    add(...values: AngleEntry): Angle {
        const value = values[0];

        if (value instanceof Angle) {
            this.degrees += value.degrees;
        } else {
            this.degrees += value;
        }

        return this;
    }


    /**
     * Subtract of angle
     * @param {Angle|number} value Angle or number (degrees)
     * @returns {Angle} Same Angle object.
     */
    subtract(...values: AngleEntry): Angle {
        const value = values[0];

        if (value instanceof Angle) {
            this.degrees -= value.degrees;
        } else {
            this.degrees -= value;
        }

        return this;
    }

    /**
     * Multiply the angle
     * @param {Angle|number} value Angle or number (degrees)
     * @returns {Angle} Same Angle object.
     */
    multiply(...values: AngleEntry): Angle {
        const value = values[0];

        if (value instanceof Angle) {
            this.degrees *= value.degrees;
        } else {
            this.degrees *= value;
        }

        return this;
    }


    /**
     * Divide the angle
     * @param {Angle|number} value Angle or number (degrees)
     * @returns {Angle} Same Angle object.
     */
    divide(...values: AngleEntry): Angle {
        const value = values[0];

        if (value instanceof Angle) {
            this.degrees /= value.degrees;
        } else {
            this.degrees /= value;
        }

        return this;
    }


    normalize(): Angle {
        if (this.degrees > 0) {
            while (this.degrees > 360) this.degrees -= 360;
        } else if (this.degrees < 0) {
            while (this.degrees < 0) this.degrees += 360;
        }

        return this;
    }


    getVector(): Vector {
        const angle = this.clone();
        angle.normalize();

        const radians = angle.radians;

        return new Vector(Math.cos(radians), Math.sin(radians));
    }


    getCSSValue(): string {
        return `${this.degrees.toFixed(3)}deg`;
    }


    clone(): Angle {
        return new Angle(this.degrees);
    }


    static fromDegrees(degrees: number): Angle {
        return new Angle(degrees);
    }


    static fromRadians(radians: number): Angle {
        const angle = new Angle()
        angle.radians = radians;

        return angle;
    }


    static fromRevolutions(revolutions: number): Angle {
        const angle = new Angle()
        angle.revolutions = revolutions;

        return angle;
    }


    static get Zero(): Angle {
        return new Angle(0);
    }


    static get Quarter(): Angle {
        return new Angle(90);
    }


    static get Third(): Angle {
        return new Angle(120);
    }


    static get Half(): Angle {
        return new Angle(180);
    }


    static get Full(): Angle {
        return new Angle(360);
    }


    /**
     * Convert degrees to radians
     * @param degrees 
     */
    static degreesToRadians(degrees: number): number {
        return (degrees / 180) * Math.PI;
    }

    /**
     * Convert radians to degrees
     * @param radians 
     */
    static radiansToDegress(radians: number): number {
        return (radians / Math.PI) * 180;
    }

    /**
     * Convert degrees to revolutions
     * @param degrees 
     */
    static degreesToRevelutions(degrees: number): number {
        return degrees / 360;
    }

    /**
     * Convert revolutions to degrees
     * @param revolutions 
     */
    static revelutionsToDegress(revolutions: number): number {
        return revolutions * 360;
    }

    /**
     * Convert radians to revolutions
     * @param radians 
     */
    static radiansToRevelutions(radians: number): number {
        return radians / (2 * Math.PI);
    }

    /**
     * Convert revolutions to radians
     * @param revolutions 
     */
    static revelutionsToRadians(revolutions: number): number {
        return revolutions * (2 * Math.PI);
    }


}