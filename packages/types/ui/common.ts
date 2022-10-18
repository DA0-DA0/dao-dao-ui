export type LoadingData<D> =
  | {
      loading: true
    }
  | {
      loading: false
      data: D
    }
