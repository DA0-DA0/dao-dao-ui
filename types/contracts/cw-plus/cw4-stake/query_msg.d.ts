export type QueryMsg =
  | {
      claims: {
        address: string
        [k: string]: unknown
      }
    }
  | {
      staked: {
        address: string
        [k: string]: unknown
      }
    }
  | {
      admin: {
        [k: string]: unknown
      }
    }
  | {
      total_weight: {
        [k: string]: unknown
      }
    }
  | {
      list_members: {
        limit?: number | null
        start_after?: string | null
        [k: string]: unknown
      }
    }
  | {
      member: {
        addr: string
        at_height?: number | null
        [k: string]: unknown
      }
    }
  | {
      hooks: {
        [k: string]: unknown
      }
    }
