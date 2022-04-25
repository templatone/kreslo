import { Numbers } from "@templatone/utils";
export class TimelineAnimation {
    _callback;
    duration;
    delay;
    looping;
    _frames = 0;
    get frames() {
        return this.frames;
    }
    constructor(callback, duration, delay, looping) {
        this._callback = callback;
        this.duration = duration;
        this.delay = delay;
        this.looping = looping;
    }
    isFirstIteration() {
        return this.frames == 0;
    }
    isLastIteration() {
        return this.frames == this.duration - 1;
    }
    getNumberOfCycles() {
        // TODO: Otestovat negativní hodnoty
        return Math.floor(this.frames / this.duration);
    }
    update = (frames) => {
        this._frames = TimelineAnimation.convertGlobalFramesToLocal(frames, this.duration, this.delay, this.looping);
        ;
        this._callback(this._frames);
    };
    static convertGlobalFramesToLocal(frames, duration, delay, looping) {
        const f = frames - delay;
        if (looping) {
            return f % duration;
        }
        else {
            return Numbers.limit(f, 0, duration - 1);
        }
    }
}
