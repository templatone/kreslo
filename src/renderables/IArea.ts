import { type IVector } from "../units/Vector";


export interface IArea { }


export interface IBoxArea extends IArea {
    origin: IVector,
    size: IVector,
}