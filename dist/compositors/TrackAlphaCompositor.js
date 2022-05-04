import { Compositor, CompositeOperation } from "./Compositor";
export class TrackAlphaCompositor extends Compositor {
    constructor(width, height, inverted = false) {
        const operation = inverted ? CompositeOperation.SourceOut : CompositeOperation.SourceIn;
        super(width, height, operation);
    }
}
