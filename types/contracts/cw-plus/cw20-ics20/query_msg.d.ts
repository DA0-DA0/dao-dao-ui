export type QueryMsg =
  | {
      port: {
        [k: string]: unknown
      }
    }
  | {
      list_channels: {
        [k: string]: unknown
      }
    }
  | {
      channel: {
        id: string
        [k: string]: unknown
      }
    }
