export type ParametersExceptFirst<F> = F extends (
  arg0: any,
  ...rest: infer R
) => any
  ? R
  : never

/**
 * Fix Omit for types with unions.
 * https://stackoverflow.com/a/72790170
 */
export type DOmit<T, K extends string> = T extends unknown ? Omit<T, K> : never

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
      contents: Error
    }

/**
 * Convenience type that is easier to use in UI components. This serves to
 * separate the component from the library used to load state/data, preventing
 * us from having to use a specific library's types inside of our components.
 * This makes it easier to migrate between different data layers and other
 * libraries in the future, such as moving from Recoil to React Query.
 *
 * See this used in `packages/stateful/hooks/useQueryLoadingData.ts`
 */
export type LoadingData<D> =
  | {
      loading: true
    }
  | {
      loading: false
      updating?: boolean
      data: D
    }

/**
 * Convenience type that is easier to use in UI components. This serves to
 * separate the component from the library used to load state/data, preventing
 * us from having to use a specific library's types inside of our components.
 * This makes it easier to migrate between different data layers and other
 * libraries in the future, such as moving from Recoil to React Query.
 *
 * See this used in `packages/stateful/hooks/useQueryLoadingDataWithError.ts`
 */
export type LoadingDataWithError<D> =
  | {
      loading: true
      errored: false
    }
  | {
      loading: false
      errored: false
      updating?: boolean
      data: D
    }
  | {
      loading: false
      updating?: boolean
      errored: true
      error: Error
    }

/**
 * A non-nullable ref with a current value that cannot be changed. This is used
 * by `useUpdatingRef` to prevent modifying the returned mutable ref object.
 */
export type ImmutableRef<T = unknown> = {
  readonly current: T
}
