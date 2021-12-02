import {Loop} from "../repeaters/Loop.js";
import {RenderingLayer} from "./RenderingLayer.js";
export class Engine extends RenderingLayer {
  constructor(canvas, width, height, pixelScale, renderingSettings) {
    super(canvas, width, height, pixelScale, renderingSettings);
    this.loop = new Loop();
  }
}
