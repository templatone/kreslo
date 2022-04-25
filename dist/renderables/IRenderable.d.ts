import { type IRenderingLayer } from "../core/mod";
export interface IRenderable {
    render(renderingLayer: IRenderingLayer): void;
    renderGizmo?(renderingLayer: IRenderingLayer): void;
}
