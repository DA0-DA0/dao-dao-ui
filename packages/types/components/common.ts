// These are convenience types that are more useful in UI components. They force
// you to check if data is loading before TypeScript allows you to access the
// data, and they also allow you to check if the data is updating. It is hard to
// use Recoil's loadable types in Storybook stories (to mock components), and
// these types make it much easier. See them used in
// `packages/utils/conversion.ts` and
// `packages/stateless/hooks/useCachedLoadable.ts`.

export type LoadingData<D> =
  | {
      loading: true
    }
  | {
      loading: false
      updating?: boolean
      data: D
    }

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
      error: unknown
    }
