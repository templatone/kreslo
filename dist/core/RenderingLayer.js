export class RenderingLayer {
    static DefaultUpdatesizeCallback = (canvas, width, height, pixelScale) => {
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
    };
    get width() { return this.#width; }
    #width = 0;
    get height() { return this.#height; }
    #height = 0;
    get pixelScale() { return this.#pixelScale; }
    #pixelScale = 1;
    get renderingSettings() { return this.#renderingSettings; }
    #renderingSettings = {
        willReadFrequently: true,
        colorSpace: 'srgb'
    };
    #updateSizeCallback = RenderingLayer.DefaultUpdatesizeCallback;
    #canvas;
    #renderingContext;
    gizmoVisibility = false;
    gizmoScale = 1;
    constructor(canvas, width, height, pixelScale, renderingSettings) {
        this.#canvas = canvas;
        this.setSize(width, height);
        if (pixelScale)
            this.setPixelScale(pixelScale);
        if (renderingSettings)
            this.setRenderingSettings(renderingSettings);
    }
    /**
     * @param width Width of canvas.
     * @param height Height of canvas.
     */
    setSize(width, height) {
        this.#width = Math.max(width, 0);
        this.#height = Math.max(height, 0);
        this._updateCanvas();
    }
    setPixelScale(pixelScale) {
        this.#pixelScale = Math.max(0, pixelScale);
        this._updateCanvas();
    }
    setRenderingSettings(settings) {
        this.#renderingSettings = settings;
        this._updateCanvas();
    }
    setUpdateSizeCallback(callback) {
        this.#updateSizeCallback = callback;
        this._updateCanvas();
    }
    _updateCanvas() {
        this.#canvas.width = this.width * this.pixelScale;
        this.#canvas.height = this.height * this.pixelScale;
        this.#updateSizeCallback(this.#canvas, this.width, this.height, this.pixelScale);
        this.resetRenderingContext();
    }
    clear() {
        const pxs = this.pixelScale;
        this.resetMatrix();
        this.#renderingContext.clearRect(0, 0, this.width * pxs, this.height * pxs);
    }
    getRenderingContext() {
        return this.#renderingContext;
    }
    resetRenderingContext() {
        this.#renderingContext = this.#canvas.getContext('2d', this.renderingSettings);
    }
    setImageSmoothing(value) {
        const ctx = this.getRenderingContext();
        ctx.msImageSmoothingEnabled = value;
        ctx.mozImageSmoothingEnabled = value;
        ctx.webkitImageSmoothingEnabled = value;
        ctx.imageSmoothingEnabled = value;
    }
    getCanvas() {
        return this.#canvas;
    }
    setMatrixToTransform(transform) {
        this.resetMatrix();
        const pxs = this.pixelScale;
        const path = [];
        let t = transform;
        path.unshift(t);
        while (t.hasParent()) {
            t = t.getParent();
            path.unshift(t);
        }
        path.forEach(t => {
            this.#renderingContext.translate(t.position.x * pxs, t.position.y * pxs);
            this.#renderingContext.rotate(t.rotation.radians);
            this.#renderingContext.scale(t.scale.x, t.scale.y);
        });
    }
    resetMatrix() {
        this.#renderingContext.resetTransform();
    }
    static getDevicePixelRatio() {
        return window.devicePixelRatio;
    }
}
