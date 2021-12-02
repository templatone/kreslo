const _RenderingLayer = class {
  constructor(canvas, width, height, pixelScale, renderingSettings) {
    this._width = 0;
    this._height = 0;
    this._pixelScale = 1;
    this._renderingSettings = {
      willReadFrequently: true,
      colorSpace: "srgb"
    };
    this._updateSizeCallback = _RenderingLayer.DefaultUpdatesizeCallback;
    this.gizmoVisibility = false;
    this.gizmoScale = 1;
    this._canvas = canvas;
    this.setSize(width, height);
    if (pixelScale)
      this.setPixelScale(pixelScale);
    if (renderingSettings)
      this.setRenderingSettings(renderingSettings);
  }
  get width() {
    return this._width;
  }
  get height() {
    return this._height;
  }
  get pixelScale() {
    return this._pixelScale;
  }
  get renderingSettings() {
    return this._renderingSettings;
  }
  setSize(width, height) {
    this._width = Math.max(width, 0);
    this._height = Math.max(height, 0);
    this._updateCanvas();
  }
  _updateCanvas() {
    this._canvas.width = this.width * this.pixelScale;
    this._canvas.height = this.height * this.pixelScale;
    this._updateSizeCallback(this._canvas, this.width, this.height, this.pixelScale);
    this.resetRenderingContext();
  }
  setUpdateSizeCallback(callback) {
    this._updateSizeCallback = callback;
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
  updateSize(width, height, pixelScale, updateStyleSizeCallback) {
    console.warn("Method `updateSize` id deprecated. Use `setSize`.");
    this.setSize(width, height);
    if (pixelScale)
      this.setPixelScale(pixelScale);
    if (updateStyleSizeCallback)
      this.setUpdateSizeCallback(updateStyleSizeCallback);
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
    this._renderingContext = this._canvas.getContext("2d", this.renderingSettings);
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
    path.forEach((t2) => {
      this._renderingContext.translate(t2.position.x * pxs, t2.position.y * pxs);
      this._renderingContext.rotate(t2.rotation.radians);
      this._renderingContext.scale(t2.scale.x, t2.scale.y);
    });
  }
  resetMatrix() {
    this._renderingContext.resetTransform();
  }
  static getDevicePixelRatio() {
    return window.devicePixelRatio;
  }
  static get PIXELSCALE() {
    return _RenderingLayer.getDevicePixelRatio();
  }
};
export let RenderingLayer = _RenderingLayer;
RenderingLayer.DefaultUpdatesizeCallback = (canvas, width, height, pixelScale) => {
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
};
RenderingLayer.DEFAULT_UPDATESIZE_CALLBACK = _RenderingLayer.DefaultUpdatesizeCallback;
