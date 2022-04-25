import {Numbers} from "../web-modules/pkg/@templatone.utils.v1.2.6.js";
export class LoopAnimation {
  constructor(callback, duration, delay, looping) {
    this._time = 0;
    this.update = (time, delta) => {
      this._time = LoopAnimation.convertGlobalMilisecondsToLocal(time, this.duration, this.delay, this.looping);
      ;
      this._callback(time, delta);
    };
    this._callback = callback;
    this.duration = duration;
    this.delay = delay;
    this.looping = looping;
  }
  get time() {
    return this._time;
  }
  isFirstIteration() {
    return this.time == 0;
  }
  isLastIteration() {
    return this.time == this.duration;
  }
  getNumberOfCycles() {
    return Math.floor(this.time / this.duration);
  }
  static convertGlobalMilisecondsToLocal(time, duration, delay, looping) {
    const m = time - delay;
    if (looping) {
      return m % duration;
    } else {
      return Numbers.limit(m, 0, duration);
    }
  }
}
