import { CustomCompositor } from "./CustomCompositor";
export class TrackLumaCompositor extends CustomCompositor {
    constructor(width, height, inverted = false) {
        const operation = (base, brending) => {
            const result = new Uint8ClampedArray(base.length);
            for (let i = 0; i < base.length; i += 4) {
                const r = brending[i + 0];
                const g = brending[i + 1];
                const b = brending[i + 2];
                const a = brending[i + 3];
                const luma = a > 0 ? ((r + g + b) / 3) / a : 0;
                const mask = inverted ? 1 - luma : luma;
                result[i + 0] = base[i + 0];
                result[i + 1] = base[i + 1];
                result[i + 2] = base[i + 2];
                result[i + 3] = base[i + 3] * mask;
            }
            return result;
        };
        super(width, height, operation);
    }
}
