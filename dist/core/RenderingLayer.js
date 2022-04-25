export class RenderingLayer {
    static DefaultUpdatesizeCallback = (canvas, width, height, pixelScale) => {
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
    };
    get width() { return this._width; }
    _width = 0;
    get height() { return this._height; }
    _height = 0;
    get pixelScale() { return this._pixelScale; }
    _pixelScale = 1;
    get renderingSettings() { return this._renderingSettings; }
    _renderingSettings = {
        willReadFrequently: true,
        colorSpace: 'srgb'
    };
    _updateSizeCallback = RenderingLayer.DefaultUpdatesizeCallback;
    _canvas;
    _renderingContext;
    gizmoVisibility = false;
    gizmoScale = 1;
    constructor(canvas, width, height, pixelScale, renderingSettings) {
        this._canvas = canvas;
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
        this._width = Math.max(width, 0);
        this._height = Math.max(height, 0);
        this._updateCanvas();
    }
    setPixelScale(pixelScale) {
        this._pixelScale = Math.max(0, pixelScale);
        this._updateCanvas();
    }
    setRenderingSettings(settings) {
        this._renderingSettings = settings;
        this._updateCanvas();
    }
    setUpdateSizeCallback(callback) {
        this._updateSizeCallback = callback;
        this._updateCanvas();
    }
    _updateCanvas() {
        this._canvas.width = this.width * this.pixelScale;
        this._canvas.height = this.height * this.pixelScale;
        this._updateSizeCallback(this._canvas, this.width, this.height, this.pixelScale);
        this.resetRenderingContext();
    }
    clear() {
        const pxs = this.pixelScale;
        this.resetMatrix();
        this._renderingContext.clearRect(0, 0, this.width * pxs, this.height * pxs);
    }
    getRenderingContext() {
        return this._renderingContext;
    }
    resetRenderingContext() {
        this._renderingContext = this._canvas.getContext('2d', this.renderingSettings);
    }
    setImageSmoothing(value) {
        const ctx = this.getRenderingContext();
        ctx.msImageSmoothingEnabled = value;
        ctx.mozImageSmoothingEnabled = value;
        ctx.webkitImageSmoothingEnabled = value;
        ctx.imageSmoothingEnabled = value;
    }
    getCanvas() {
        return this._canvas;
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
            this._renderingContext.translate(t.position.x * pxs, t.position.y * pxs);
            this._renderingContext.rotate(t.rotation.radians);
            this._renderingContext.scale(t.scale.x, t.scale.y);
        });
    }
    resetMatrix() {
        this._renderingContext.resetTransform();
    }
    static getDevicePixelRatio() {
        return window.devicePixelRatio;
    }
}
