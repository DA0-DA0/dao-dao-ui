import { Chain } from '@chain-registry/types'
import { Decimal } from '@cosmjs/math'
import { GasPrice } from '@cosmjs/stargate'
import { QueryClient } from '@tanstack/react-query'

import { DecCoin } from '@dao-dao/types/protobuf/codegen/cosmos/base/v1beta1/coin'
import { maybeGetNativeTokenForChainId } from '@dao-dao/utils'

import { chainQueries } from '../query'

/**
 * A dynamic gas price that attempts to fetch from the query client cache,
 * defaulting to the local chain registry if the query does not exist.
 *
 * This does not fetch the query—that must be handled by the caller.
 */
export class DynamicGasPrice implements GasPrice {
  public readonly defaultGasPrice: {
    amount: Decimal
    denom: string
  }

  public constructor(
    private readonly queryClient: QueryClient,
    private readonly chain: Chain
  ) {
    const feeDenom = maybeGetNativeTokenForChainId(
      this.chain.chain_id
    )?.denomOrAddress
    if (!feeDenom) {
      throw new Error(`Chain ${chain.chain_id} has no fee token`)
    }

    const feeToken = this.chain.fees?.fee_tokens.find(
      ({ denom }) => denom === feeDenom
    )

    const gasPriceAmount =
      feeToken?.average_gas_price ??
      feeToken?.high_gas_price ??
      feeToken?.low_gas_price ??
      feeToken?.fixed_min_gas_price ??
      0

    this.defaultGasPrice = {
      amount: Decimal.fromUserInput(Number(gasPriceAmount).toFixed(18), 18),
      denom: feeDenom,
    }
  }

  get dynamicGasPrice(): DecCoin | undefined {
    return this.queryClient.getQueryData(
      chainQueries.dynamicGasPrice({
        chainId: this.chain.chain_id,
      }).queryKey
    )
  }

  get denom(): string {
    return this.dynamicGasPrice?.denom ?? this.defaultGasPrice.denom
  }

  get amount(): Decimal {
    return this.dynamicGasPrice
      ? Decimal.fromUserInput(this.dynamicGasPrice.amount, 18)
      : this.defaultGasPrice.amount
  }

  public toString(): string {
    return this.amount.toString() + this.denom
  }
}
