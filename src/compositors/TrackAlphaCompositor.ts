import { Compositor, CompositeOperation } from "./Compositor";


export class TrackAlphaCompositor extends Compositor {
    constructor(width: number, height: number, inverted: boolean = false) {
        super(width, height, inverted ? CompositeOperation.SourceIn : CompositeOperation.SourceOut);
    }
}
