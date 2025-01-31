export function NonNullableNull<T>(): T {
    return null as any as T;
}