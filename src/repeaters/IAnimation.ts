export { LoopAnimation } from "./LoopAnimation";
export { TimelineAnimation } from "./TimelineAnimation";


export interface IAnimation<TCallback> {

    duration: number,
    delay: number,
    looping: boolean,

    update: TCallback,

    isFirstIteration(): boolean,
    isLastIteration(): boolean,

    getNumberOfCycles(): number,
}