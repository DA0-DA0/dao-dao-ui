export type QueryMsg =
  | {
      balance: {
        address: string
        [k: string]: unknown
      }
    }
  | {
      token_info: {
        [k: string]: unknown
      }
    }
  | {
      minter: {
        [k: string]: unknown
      }
    }
  | {
      allowance: {
        owner: string
        spender: string
        [k: string]: unknown
      }
    }
  | {
      all_allowances: {
        limit?: number | null
        owner: string
        start_after?: string | null
        [k: string]: unknown
      }
    }
  | {
      all_accounts: {
        limit?: number | null
        start_after?: string | null
        [k: string]: unknown
      }
    }
  | {
      marketing_info: {
        [k: string]: unknown
      }
    }
  | {
      download_logo: {
        [k: string]: unknown
      }
    }
