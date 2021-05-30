export type ValueModifierType<T> = {
    (input: T): T;
}