import { Vector } from "./Vector";
export class Angle {
    degrees = 0;
    get revolutions() {
        return Angle.degreesToRevelutions(this.degrees);
    }
    set revolutions(revolutions) {
        this.degrees = Angle.revelutionsToDegress(revolutions);
    }
    get radians() {
        return Angle.degreesToRadians(this.degrees);
    }
    set radians(radians) {
        this.degrees = Angle.radiansToDegress(radians);
    }
    constructor(...values) {
        this.set(...values);
    }
    set(...values) {
        const degrees = this.#parseEntry(values);
        this.degrees = degrees;
        return this;
    }
    /**
     * Add to angle
     * @param value Angle or number (degrees)
     * @returns Same Angle object.
     */
    add(...values) {
        const degrees = this.#parseEntry(values);
        this.degrees += degrees;
        return this;
    }
    /**
     * Subtract of angle
     * @param value Angle or number (degrees)
     * @returns Same Angle object.
     */
    subtract(...values) {
        const degrees = this.#parseEntry(values);
        this.degrees -= degrees;
        return this;
    }
    /**
     * Multiply the angle
     * @param value Angle or number (degrees)
     * @returns Same Angle object.
     */
    multiply(...values) {
        const degrees = this.#parseEntry(values);
        this.degrees *= degrees;
        return this;
    }
    /**
     * Divide the angle
     * @param value Angle or number (degrees)
     * @returns Same Angle object.
     */
    divide(...values) {
        const degrees = this.#parseEntry(values);
        this.degrees /= degrees;
        return this;
    }
    normalize() {
        if (this.degrees > 0) {
            while (this.degrees > 360)
                this.degrees -= 360;
        }
        else {
            while (this.degrees < 0)
                this.degrees += 360;
        }
        return this;
    }
    getVector() {
        const angle = this.clone();
        angle.normalize();
        const radians = angle.radians;
        return new Vector(Math.cos(radians), Math.sin(radians));
    }
    getCSSValue() {
        return `${this.degrees.toFixed(3)}deg`;
    }
    clone() {
        return new Angle(this.degrees);
    }
    #parseEntry(entry) {
        const [value, unit] = entry;
        if (value instanceof Angle) {
            return value.degrees;
        }
        else {
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
    static fromDegrees(degrees) {
        return new Angle(degrees);
    }
    static fromRadians(radians) {
        const angle = new Angle(0);
        angle.radians = radians;
        return angle;
    }
    static fromRevolutions(revolutions) {
        const angle = new Angle(0);
        angle.revolutions = revolutions;
        return angle;
    }
    static get Zero() {
        return Angle.fromDegrees(0);
    }
    static get Quarter() {
        return Angle.fromDegrees(90);
    }
    static get Third() {
        return Angle.fromDegrees(120);
    }
    static get Half() {
        return Angle.fromDegrees(180);
    }
    static get Full() {
        return Angle.fromDegrees(360);
    }
    /**
     * Convert degrees to radians
     * @param degrees
     */
    static degreesToRadians(degrees) {
        return (degrees / 180) * Math.PI;
    }
    /**
     * Convert radians to degrees
     * @param radians
     */
    static radiansToDegress(radians) {
        return (radians / Math.PI) * 180;
    }
    /**
     * Convert degrees to revolutions
     * @param degrees
     */
    static degreesToRevelutions(degrees) {
        return degrees / 360;
    }
    /**
     * Convert revolutions to degrees
     * @param revolutions
     */
    static revelutionsToDegress(revolutions) {
        return revolutions * 360;
    }
    /**
     * Convert radians to revolutions
     * @param radians
     */
    static radiansToRevelutions(radians) {
        return radians / (2 * Math.PI);
    }
    /**
     * Convert revolutions to radians
     * @param revolutions
     */
    static revelutionsToRadians(revolutions) {
        return revolutions * (2 * Math.PI);
    }
}
export function degrees(template, ...params) {
    const s = String.raw(template, ...params).trim();
    return Angle.fromDegrees(parseFloat(s));
}
export function radians(template, ...params) {
    const s = String.raw(template, ...params).trim();
    return Angle.fromRadians(parseFloat(s));
}
export function revolutions(template, ...params) {
    const s = String.raw(template, ...params).trim();
    return Angle.fromRevolutions(parseFloat(s));
}
