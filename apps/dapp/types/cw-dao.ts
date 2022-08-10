// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

type Uint128 = string

export interface Cw20Balance {
  address: string
  amount: Uint128
}
