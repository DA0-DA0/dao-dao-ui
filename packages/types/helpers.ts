import { FieldValues, Path, PathValue } from 'react-hook-form'

// Get keys of object whose values are of a given type.
export type KeysMatching<T, V> = {
  [K in keyof T]-?: T[K] extends V ? K : never
}[keyof T]

// Return the field name paths that have type boolean.
export type BooleanFieldNames<FV extends FieldValues> = {
  [Property in Path<FV>]: PathValue<FV, Property> extends boolean | undefined
    ? Property
    : never
}[Path<FV>]
