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
      updating?: boolean
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
