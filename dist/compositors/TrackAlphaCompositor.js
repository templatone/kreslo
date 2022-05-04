import { Compositor, CompositeOperation } from "./Compositor";
export class TrackAlphaCompositor extends Compositor {
    constructor(width, height, inverted = false) {
        super(width, height, inverted ? CompositeOperation.SourceIn : CompositeOperation.SourceOut);
    }
}
