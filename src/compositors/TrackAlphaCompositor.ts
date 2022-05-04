import { Compositor, CompositeOperation } from "./Compositor";


export class TrackAlphaCompositor extends Compositor {
    constructor(width: number, height: number, inverted: boolean = false) {
        const operation = inverted ? CompositeOperation.SourceOut : CompositeOperation.SourceIn;
        super(width, height, operation);
    }
}
