import { LayerBlender, CompositeOperation } from "./LayerBlender";
export class TrackAlpha {
    _layerBlender;
    get matteLayer() {
        return this._layerBlender.upperLayer;
    }
    get sourceLayer() {
        return this._layerBlender.lowerLayer;
    }
    constructor(width, height, inverted = false) {
        this._layerBlender = new LayerBlender(width, height, inverted ? CompositeOperation.SourceOut : CompositeOperation.SourceIn);
    }
    render(renderingLayer) {
        // TODO: dodělat gizma
        this._layerBlender.render(renderingLayer);
    }
    clear() {
        this._layerBlender.clear();
    }
}
