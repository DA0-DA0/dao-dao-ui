export type CachedLoadable<T> =
  | {
      state: 'loading'
      contents: undefined
    }
  | {
      state: 'hasValue'
      contents: T
      updating: boolean
    }
  | {
      state: 'hasError'
      contents: any
    }
