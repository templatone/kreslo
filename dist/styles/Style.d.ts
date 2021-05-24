import { IBoundingBox } from "../renderables/IBoundingBox.js";
import { IClonable } from "../core/IClonable.js";
import { IRenderingLayer } from "../core/RenderingLayer.js";
declare type getStyleCallback = {
    (renderingLayer: IRenderingLayer, boundingBox: IBoundingBox): string | CanvasGradient | CanvasPattern;
};
export interface IStyle {
    computeStyle: getStyleCallback;
}
export declare class Style implements IStyle, IClonable<Style> {
    private _style;
    constructor(style: EntryType_Style);
    computeStyle(renderingLayer: IRenderingLayer, boundingBox: IBoundingBox): string | CanvasGradient | CanvasPattern;
    setStyle(style: EntryType_Style): void;
    getStyle(): IStyle;
    clone(): Style;
    private static _parseEntryType_Style;
}
export declare type EntryType_Style = IStyle | string | CanvasGradient | CanvasPattern;
export {};
