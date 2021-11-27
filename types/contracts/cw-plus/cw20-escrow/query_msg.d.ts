export type QueryMsg =
  | {
      list: {
        [k: string]: unknown
      }
    }
  | {
      details: {
        id: string
        [k: string]: unknown
      }
    }
