import { Vector } from "../units/mod";
export class Gradient {
    start;
    end;
    steps = [];
    constructor(start, end, steps) {
        this.start = new Vector(start);
        this.end = new Vector(end);
        this.steps = steps;
    }
    computeStyle(renderingLayer, boundingBox) {
        throw new Error("Mehod `getStyle` is not implemented.");
    }
}
