export type UpdateSizeCallbackType = {
    (canvas: HTMLCanvasElement, width: number, height: number, pixelScale: number): void;
};


/**
 * @deprecated Use `UpdateSizeCallbackType`
 */
export type UpdateStyleSizeCallbackType = UpdateSizeCallbackType;