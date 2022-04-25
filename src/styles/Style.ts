import { type IBoundingBox } from "../renderables/IBoundingBox";
import { type IClonable } from "../core/IClonable";
import { type IRenderingLayer } from "../core/RenderingLayer";


export interface IStyle {
    computeStyle: {
        (renderingLayer: IRenderingLayer, boundingBox: IBoundingBox): string | CanvasGradient | CanvasPattern
    }
}


export class Style implements IStyle, IClonable<Style> {

    private _style: IStyle;


    constructor(style: EntryStyleType) {
        this._style = Style._parseEntryType_Style(style);
    }


    computeStyle(renderingLayer: IRenderingLayer, boundingBox: IBoundingBox): string | CanvasGradient | CanvasPattern {
        const v = this._style.computeStyle(renderingLayer, boundingBox);
        return v;
    }


    setStyle(style: EntryStyleType) {
        this._style = Style._parseEntryType_Style(style);
    }


    getStyle() {
        return this._style;
    }


    clone(): Style {
        const thisStyle = this._style as any;
        const style = thisStyle.hasOwnProperty('clone') ? thisStyle.clone() : { ...this._style };

        return new Style(style);
    }


    private static _parseEntryType_Style(raw: EntryStyleType): IStyle {
        const style = raw;

        if (typeof style === 'object' && typeof (style as IStyle).computeStyle === 'function') {
            return style as IStyle;
        } else {
            return {
                computeStyle: (renderingLayer: IRenderingLayer, boundingBox: IBoundingBox) => {
                    return style as string | CanvasGradient | CanvasPattern;
                }
            }
        }
    }
}


export type EntryStyleType =
    | IStyle
    | string
    | CanvasGradient
    | CanvasPattern;