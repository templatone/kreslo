import { Numbers } from "@templatone/utils";
export class LoopAnimation {
    _callback;
    duration;
    delay;
    looping;
    _time = 0;
    get time() {
        return this._time;
    }
    constructor(callback, duration, delay, looping) {
        this._callback = callback;
        this.duration = duration;
        this.delay = delay;
        this.looping = looping;
    }
    isFirstIteration() {
        return this.time == 0;
    }
    isLastIteration() {
        return this.time == this.duration;
    }
    getNumberOfCycles() {
        // TODO: Otestovat negativní hodnoty
        return Math.floor(this.time / this.duration);
    }
    update = (time, delta) => {
        this._time = LoopAnimation.convertGlobalMilisecondsToLocal(time, this.duration, this.delay, this.looping);
        ;
        this._callback(time, delta);
    };
    static convertGlobalMilisecondsToLocal(time, duration, delay, looping) {
        const m = time - delay;
        if (looping) {
            return m % duration;
        }
        else {
            return Numbers.limit(m, 0, duration);
        }
    }
}
