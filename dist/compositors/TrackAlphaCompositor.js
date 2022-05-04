import { LayerBlender, CompositeOperation } from "./LayerBlender";
export class TrackAlphaCompositor {
    #layerBlender;
    get matteLayer() {
        return this.#layerBlender.upperLayer;
    }
    get sourceLayer() {
        return this.#layerBlender.lowerLayer;
    }
    constructor(width, height, inverted = false) {
        this.#layerBlender = new LayerBlender(width, height, inverted ? CompositeOperation.SourceOut : CompositeOperation.SourceIn);
    }
    render(renderingLayer) {
        // TODO: dodělat gizma
        this.#layerBlender.render(renderingLayer);
    }
    clear() {
        this.#layerBlender.clear();
    }
}
