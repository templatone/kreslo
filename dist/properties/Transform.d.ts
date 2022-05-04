import { Angle } from "../units/Angle";
import { Vector, type VectorType } from "../units/Vector";
import { type IClonable } from "../core/IClonable";
export declare class Transform implements IClonable<Transform> {
    origin: Vector;
    position: Vector;
    scale: Vector;
    rotation: Angle;
    private _parent;
    constructor(position?: VectorType, scale?: VectorType, rotation?: Angle, origin?: VectorType);
    getComputed(): Transform;
    /**
     * @param parent Transformace rodiče
     * @param updateLocals Pokud bude TRUE, změní transformace tak, aby po parentování opticky identická
     */
    setParent(parent: Transform, updateLocals?: boolean): void;
    clearParent(updateLocals?: boolean): void;
    hasParent(): boolean;
    getParent(): Transform;
    clone(): Transform;
}
