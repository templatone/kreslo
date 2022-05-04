import { LayerBlender, CompositeOperation } from "./LayerBlender";
import { type IRenderable } from "../renderables/IRenderable";
import { type RenderingLayer, IRenderingLayer } from "../core/RenderingLayer";


export class TrackAlphaCompositor implements IRenderable {

    #layerBlender: LayerBlender;


    get matteLayer(): RenderingLayer {
        return this.#layerBlender.upperLayer;
    }
    get sourceLayer(): RenderingLayer {
        return this.#layerBlender.lowerLayer;
    }

    constructor(width: number, height: number, inverted: boolean = false) {
        this.#layerBlender = new LayerBlender(width, height, inverted ? CompositeOperation.SourceOut : CompositeOperation.SourceIn);
    }


    render(renderingLayer: IRenderingLayer) {
        // TODO: dodělat gizma
        this.#layerBlender.render(renderingLayer);
    }


    clear() {
        this.#layerBlender.clear();
    }

}