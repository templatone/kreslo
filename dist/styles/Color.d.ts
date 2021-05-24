import { IClonable } from "../core/IClonable.js";
import { IStyle } from "./Style.js";
export declare class Color implements IClonable<Color>, IStyle {
    private _red;
    get red(): number;
    set red(v: number);
    private _green;
    get green(): number;
    set green(v: number);
    private _blue;
    get blue(): number;
    set blue(v: number);
    private _alpha;
    get alpha(): number;
    set alpha(v: number);
    constructor(r?: number, g?: number, b?: number, alpha?: number);
    getRGBA(): IColorRGBA;
    getRGB(): IColorRGB;
    getHSLA(): IColorHSLA;
    getHSL(): IColorHSL;
    getHue(): number;
    getSaturation(): number;
    getLightness(): number;
    setRGBA(...values: EntryType_ColorRGBA): Color;
    setRGB(...values: EntryType_ColorRGB): Color;
    setHSLA(...values: EntryType_ColorHSLA): Color;
    setHSL(...values: EntryType_ColorHSL): Color;
    setHue(hue: number): void;
    setSaturation(saturation: number): void;
    setLightness(lightness: number): void;
    getHex(): string;
    getCSSValue(): string;
    computeStyle(): string;
    /**
     * Returns cloned Color object
     * @returns {Color} Color
     */
    clone(): Color;
    /**
     * Create new Color object ❤️
     * @returns {Color} new Color
     */
    static get Red(): Color;
    /**
     * Create new Color object 🟨
     * @returns {Color} new Color
     */
    static get Yellow(): Color;
    /**
     * Create new Color object 🟩
     * @returns {Color} new Color
     */
    static get Green(): Color;
    /**
     * Create new Color object 🟦
     * @returns {Color} new Color
     */
    static get Blue(): Color;
    /**
     * Create new Color object 🟪
     * @returns {Color} new Color
     */
    static get Magenta(): Color;
    /**
     * Create new Color object ⬛️
     * @returns {Color} new Color
     */
    static get Black(): Color;
    /**
     * Create new Color object ⬜️
     * @returns {Color} new Color
     */
    static get White(): Color;
    /**
     * Create new Color object 🐀
     * @returns {Color} new Color
     */
    static get Grey(): Color;
    /**
     * Create new Color object 🏁
     * @returns {Color} new Color
     */
    static get Transparent(): Color;
    /**
     * Create new Color object from hexdec value
     * @param {string} value #RGB|#RRGGBB|#RRGGBBAA
     * @returns {Color} new Color
     */
    static fromHex(value: string): Color;
    /**
     * Create new Color object from RGBA values
     * @param {number} r ❤️ Red channel <0, 255>
     * @param {number} g 💚 Green channel <0, 255>
     * @param {number} b 💙 Blue channel <0, 255>
     * @param {number} alpha 🏁 Alpha channel <0, 1>
     * @returns {Color} new Color
     */
    static fromRGBA(...values: EntryType_ColorRGBA): Color;
    /**
     * Create new Color object from RGB values
     * @param {number} r ❤️ Red channel <0, 255>
     * @param {number} g 💚 Green channel <0, 255>
     * @param {number} b 💙 Blue channel <0, 255>
     * @returns {Color} new Color
     */
    static fromRGB(...values: EntryType_ColorRGB): Color;
    /**
     * Create new Color object from HSLA values
     * @param {number} h 🌈 Hue channel <0, 360)
     * @param {number} s ☯️ Saturation channel <0, 100>
     * @param {number} l ☀️ Lightness channel <0, 100>
     * @param {number} alpha 🏁 Alpha channel <0, 1>
     * @returns {Color} new Color
     */
    static fromHSLA(...values: EntryType_ColorHSLA): Color;
    /**
     * Create new Color object from HSL values
     * @param {number} h 🌈 Hue channel <0, 360)
     * @param {number} s ☯️ Saturation channel <0, 100>
     * @param {number} l ☀️ Lightness channel <0, 100>
     * @returns {Color} new Color
     */
    static fromHSL(...values: EntryType_ColorHSL): Color;
    /**
     * Conver RGBA to HSLA
     * @param {number} r ❤️ Red channel <0, 255>
     * @param {number} g 💚 Green channel <0, 255>
     * @param {number} b 🟦 Blue channel <0, 255>
     * @param {number} alpha 🏁 Alpha channel <0, 1>
     * @returns IColorHSLA
     */
    static convertRGBAtoHSLA: (...values: EntryType_ColorRGBA) => IColorHSLA;
    /**
     * Conver RGB to HSL
     * @param {number} r ❤️ Red channel <0, 255>
     * @param {number} g 💚 Green channel <0, 255>
     * @param {number} b 🟦 Blue channel <0, 255>
     * @returns IColorHSL
     */
    static convertRGBtoHSL: (...values: EntryType_ColorRGB) => IColorHSL;
    /**
     * Convert HSLA to RGBA
     * @param {number} h 🌈 Hue channel <0, 360)
     * @param {number} s ☯️ Saturation channel <0, 100>
     * @param {number} l ☀️ Lightness channel <0, 100>
     * @param {number} alpha 🏁 Alpha channel <0, 1>
     * @returns IColorRGBA
     */
    static convertHSLAtoRGBA: (...values: EntryType_ColorHSLA) => IColorRGBA;
    /**
     * Convert HSL to RGB
     * @param {number} r ❤️ Red channel <0, 255>
     * @param {number} g 💚 Green channel <0, 255>
     * @param {number} b 🟦 Blue channel <0, 255>
     * @returns IColorRGB
     */
    static convertHSLtoRGB: (...values: EntryType_ColorHSL) => IColorRGB;
    /**
     * Convert RGBA to Hex
     * @param {number} r ❤️ Red channel <0, 255>
     * @param {number} g 💚 Green channel <0, 255>
     * @param {number} b 🟦 Blue channel <0, 255>
     * @param {number} alpha 🏁 Alpha channel <0, 1>
     * @returns string
     */
    static convertRGBAtoHex: (...values: EntryType_ColorRGBA) => string;
    /**
     * Convert RGB to Hex
     * @param {number} r ❤️ Red channel <0, 255>
     * @param {number} g 💚 Green channel <0, 255>
     * @param {number} b 🟦 Blue channel <0, 255>
     * @returns string
     */
    static convertRGBtoHex: (...values: EntryType_ColorRGB) => string;
    /**
     * Convert HSLA to Hex
     * @param {number} h 🌈 Hue channel <0, 360)
     * @param {number} s ☯️ Saturation channel <0, 100>
     * @param {number} l ☀️ Lightness channel <0, 100>
     * @param {number} alpha 🏁 Alpha channel <0, 1>
     * @returns string
     */
    static convertHSLAtoHex: (...values: EntryType_ColorHSLA) => string;
    /**
     * Convert HSL to Hex
     * @param {number} r ❤️ Red channel <0, 255>
     * @param {number} g 💚 Green channel <0, 255>
     * @param {number} b 🟦 Blue channel <0, 255>
     * @returns string
     */
    static convertHSLtoHex: (...values: EntryType_ColorHSL) => string;
    static convertRGBAtoStyle: (...values: EntryType_ColorRGBA) => string;
    private static _parseEntryType_ColorRGBA;
    private static _parseEntryType_ColorRGB;
    private static _parseEntryType_ColorHSLA;
    private static _parseEntryType_ColorHSL;
}
export interface IColorRGB {
    red: number;
    green: number;
    blue: number;
}
export interface IColorRGBA extends IColorRGB {
    alpha: number;
}
export interface IColorHSL {
    hue: number;
    saturation: number;
    lightness: number;
}
export interface IColorHSLA extends IColorHSL {
    alpha: number;
}
export declare type EntryType_ColorRGBA = [red: number, green: number, blue: number, alpha: number] | [color: IColorRGBA];
export declare type EntryType_ColorRGB = [red: number, green: number, blue: number] | [color: IColorRGB];
export declare type EntryType_ColorHSLA = [hue: number, saturation: number, lightness: number, alpha: number] | [color: IColorHSLA];
export declare type EntryType_ColorHSL = [hue: number, saturation: number, lightness: number] | [color: IColorHSL];
