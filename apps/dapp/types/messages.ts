// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

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
