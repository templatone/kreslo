import { Vector } from "./Vector";
import { type IClonable } from "../core/IClonable";


export class Angle implements IClonable<Angle> {

    degrees: number = 0;

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


    constructor(...values: EntryAngleType) {
        this.set(...values);
    }


    set(...values: EntryAngleType): Angle {
        const degrees = this.#parseEntry(values);
        this.degrees = degrees;

        return this;
    }


    /**
     * Add to angle
     * @param value Angle or number (degrees)
     * @returns Same Angle object.
     */
    add(...values: EntryAngleType): Angle {
        const degrees = this.#parseEntry(values);
        this.degrees += degrees;

        return this;
    }


    /**
     * Subtract of angle
     * @param value Angle or number (degrees)
     * @returns Same Angle object.
     */
    subtract(...values: EntryAngleType): Angle {
        const degrees = this.#parseEntry(values);
        this.degrees -= degrees;

        return this;
    }

    /**
     * Multiply the angle
     * @param value Angle or number (degrees)
     * @returns Same Angle object.
     */
    multiply(...values: EntryAngleType): Angle {
        const degrees = this.#parseEntry(values);
        this.degrees *= degrees;

        return this;
    }


    /**
     * Divide the angle
     * @param value Angle or number (degrees)
     * @returns Same Angle object.
     */
    divide(...values: EntryAngleType): Angle {
        const degrees = this.#parseEntry(values);
        this.degrees /= degrees;

        return this;
    }


    normalize(): Angle {
        if (this.degrees > 0) {
            while (this.degrees > 360) this.degrees -= 360;
        } else {
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


    #parseEntry(entry: EntryAngleType): number {
        const [value, unit] = entry;

        if (value instanceof Angle) {
            return value.degrees;
        } else {
            switch (unit) {
                case "radians":
                    return Angle.radiansToDegress(value);

                case "revolutions":
                    return Angle.revelutionsToDegress(value);

                case "degrees":
                    return value;

                default:
                    return value;
            }
        }
    }


    static fromDegrees(degrees: number): Angle {
        return new Angle(degrees);
    }


    static fromRadians(radians: number): Angle {
        const angle = new Angle(0)
        angle.radians = radians;

        return angle;
    }


    static fromRevolutions(revolutions: number): Angle {
        const angle = new Angle(0)
        angle.revolutions = revolutions;

        return angle;
    }


    static get Zero(): Angle {
        return Angle.fromDegrees(0);
    }


    static get Quarter(): Angle {
        return Angle.fromDegrees(90);
    }


    static get Third(): Angle {
        return Angle.fromDegrees(120);
    }


    static get Half(): Angle {
        return Angle.fromDegrees(180);
    }


    static get Full(): Angle {
        return Angle.fromDegrees(360);
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


export type EntryAngleType =
    | [degrees: number]
    | [degrees: number, unit: "degrees"]
    | [radians: number, unit: "radians"]
    | [revolutions: number, unit: "revolutions"]
    | [angle: Angle];



export function degrees(template: TemplateStringsArray, ...params: unknown[]) {
    const s = String.raw(template, ...params).trim();
    return Angle.fromDegrees(parseFloat(s));
}


export function radians(template: TemplateStringsArray, ...params: unknown[]) {
    const s = String.raw(template, ...params).trim();
    return Angle.fromRadians(parseFloat(s));
}


export function revolutions(template: TemplateStringsArray, ...params: unknown[]) {
    const s = String.raw(template, ...params).trim();
    return Angle.fromRevolutions(parseFloat(s));
}
