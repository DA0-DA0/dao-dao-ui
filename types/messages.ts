import { Coin } from '@dao-dao/types/contracts/cw3-dao'

export type MintMsg = {
  wasm: {
    execute: {
      contract_addr: string
      funds: Coin[]
      clear_admin: any
      msg: {
        mint: {
          recipient: string
          amount: string
        }
      }
    }
  }
}
