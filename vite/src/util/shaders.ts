import { IUniform } from 'three';
export const asUniform = <T>(value: T): IUniform<T> => {
    return { value: value }
}