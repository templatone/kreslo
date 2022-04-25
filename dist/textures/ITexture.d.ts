import { type IObject } from "../renderables/IObject";
import { type IRenderable } from "../renderables/IRenderable";
import { type IRenderingLayer } from "../core/RenderingLayer";
import { type IVisible } from "../renderables/IVisible";
export interface ITexture extends IObject, IRenderable, IVisible {
    generate(renderingLayer: IRenderingLayer): Promise<void>;
}
