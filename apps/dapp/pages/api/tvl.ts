// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import { CosmWasmClient } from '@cosmjs/cosmwasm-stargate'
import { NextApiRequest, NextApiResponse } from 'next'

import {
  CHAIN_RPC_ENDPOINT,
  DAO_DAO_CORE_ADDRESS,
  NATIVE_DECIMALS,
  NATIVE_DENOM,
  convertMicroDenomToDenomWithDecimals,
} from '@dao-dao/utils'

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  const client = await CosmWasmClient.connect(CHAIN_RPC_ENDPOINT)

  const nativeBalance = await client.getBalance(
    DAO_DAO_CORE_ADDRESS,
    NATIVE_DENOM
  )

  const tvl = convertMicroDenomToDenomWithDecimals(
    nativeBalance.amount,
    NATIVE_DECIMALS
  )

  res.status(200).json({ tvl })
}
