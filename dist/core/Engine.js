import { Loop } from "../repeaters/Loop";
import { RenderingLayer } from "./RenderingLayer";
export class Engine extends RenderingLayer {
    loop;
    constructor(canvas, width, height, pixelScale, renderingSettings) {
        super(canvas, width, height, pixelScale, renderingSettings);
        this.loop = new Loop();
        // this.debuggerBar = new DebuggerBar(this);
        // this.loop.addUpdateCallback((time: number, delta: number) => this.debuggerBar.update(time, delta));
    }
}
