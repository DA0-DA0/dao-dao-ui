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
      data: D
    }
  | {
      loading: false
      errored: true
      error: unknown
    }
