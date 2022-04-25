export class Font {
    family;
    size;
    weight = 400;
    italic = false;
    lineHeight;
    letterSpacing = 0;
    features = [];
    align = "left";
    baseline = "alphabetic";
    constructor(size = 12, family = 'sans-serif') {
        this.size = size;
        this.lineHeight = this.size * 1.5;
        this.family = family;
    }
    apply(renderingLayer) {
        const ctx = renderingLayer.getRenderingContext();
        const pxs = renderingLayer.pixelScale;
        const canvas = renderingLayer.getCanvas();
        canvas.style.letterSpacing = `${this.letterSpacing}em`;
        canvas.style.fontFeatureSettings = this.features.length > 0 ? this.features.map(f => `"${f}"`).join(', ') : 'initial';
        const fontSize = this.size * pxs;
        const font = [
            this.weight.toFixed(0),
            `${fontSize.toFixed(0)}px`,
            this.italic ? 'italic' : '',
            this.family,
        ].join(' ');
        ctx.font = font;
        ctx.textAlign = this.align;
    }
    clone() {
        const f = new Font();
        f.size = this.size;
        f.family = this.family;
        f.size = this.size;
        f.weight = this.weight;
        f.italic = this.italic;
        f.lineHeight = this.lineHeight;
        f.letterSpacing = this.letterSpacing;
        f.features = this.features;
        f.align = this.align;
        f.baseline = this.baseline;
        return f;
    }
    static clear(renderingLayer) {
        const canvas = renderingLayer.getCanvas();
        canvas.style.letterSpacing = `0em`;
        canvas.style.fontFeatureSettings = 'initial';
        const ctx = renderingLayer.getRenderingContext();
        ctx.font = "10px sans-serif";
    }
}
export var FontFeatures;
(function (FontFeatures) {
    FontFeatures["StandardLigatures"] = "liga";
    FontFeatures["ContextualAlternates"] = "calt";
    FontFeatures["DiscretionaryLigatures"] = "dlig";
    FontFeatures["SmallSaps"] = "smcp";
    FontFeatures["CapitalsToSmallCaps"] = "c2sc";
    FontFeatures["Swashes"] = "swsh";
    FontFeatures["StylisticAlternates"] = "salt";
    FontFeatures["LiningFigures"] = "lnum";
    FontFeatures["OldstyleFigures"] = "onum";
    FontFeatures["ProportionalFigures"] = "pnum";
    FontFeatures["TabularFigures"] = "tnum";
    FontFeatures["Fractions"] = "frac";
    FontFeatures["Ordinals"] = "ordn";
    // StylisticSets = 'ss##', // TODO: Vyřešit stylistické sady
    FontFeatures["ProportionalWidths"] = "pwid";
    FontFeatures["ProportionalAlternateWidths"] = "palt";
    FontFeatures["ProportionalKana"] = "pkna";
    FontFeatures["FullWidths"] = "fwid";
    FontFeatures["HalfWidths"] = "hwid";
    FontFeatures["AlternateHalfWidths"] = "halt";
    FontFeatures["ThirdWidths"] = "twid";
    FontFeatures["QuarterWidths"] = "qwid";
    FontFeatures["JIS78Forms"] = "jp78";
    FontFeatures["JIS83Forms"] = "jp83";
    FontFeatures["JIS90Forms"] = "jp90";
    FontFeatures["JIS2004Forms"] = "jp04";
    FontFeatures["TraditionalForms"] = "trad";
    FontFeatures["RubyNotationForms"] = "ruby";
    FontFeatures["HorizontalKanaAlternates"] = "hkna";
    FontFeatures["NLCKanjiForms"] = "nlck";
    FontFeatures["AlternateAnnotationForms"] = "nalt";
    FontFeatures["Italics"] = "ital";
    FontFeatures["VerticalKerning"] = "vkrn";
    FontFeatures["VerticalAlternates"] = "vert";
    FontFeatures["ProportionalAlternateVerticalMetrics"] = "vpal";
    FontFeatures["AlternateVerticalHalfMetrics"] = "vhal";
    FontFeatures["VerticalKanaAlternates"] = "vkna";
    FontFeatures["Kerning"] = "kern";
    FontFeatures["GlyphComposition"] = "ccmp";
    FontFeatures["LocalizedForms"] = "locl";
    FontFeatures["Superscript"] = "sups";
    FontFeatures["Subscript"] = "subs";
})(FontFeatures || (FontFeatures = {}));
