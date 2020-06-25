import { Utils } from "../node_modules/kanafas-utils/index.js";
import { Color as UnitColor } from "../node_modules/kanafas-units/Color.js";
import { IRenderingLayer } from "../RenderingLayer.js";
import { IBoxArea } from "../renderables/types.js";
import { IStyle } from "./Style.js";



export class Color extends UnitColor implements IStyleColor {

    getStyle(): string {
        return `rgba(${this.red.toFixed(3)}, ${this.green.toFixed(3)}, ${this.blue.toFixed(3)}, ${this.alpha.toFixed(3)})`;
    }

}


export interface IStyleColor extends IStyle {
    red: number,
    green: number,
    blue: number,
    alpha: number,

    getStyle(renderingLayer: IRenderingLayer, boundingBox: IBoxArea): string,
}