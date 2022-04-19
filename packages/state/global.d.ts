// Get the keys that are functions.
type FunctionKeyOf<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => any ? K : never
}[keyof T]
