import { Decimal } from '@cosmjs/math'
import { GasPrice } from '@cosmjs/stargate'
import { QueryClient } from '@tanstack/react-query'

import { AnyChain } from '@dao-dao/types'
import { DecCoin } from '@dao-dao/types/protobuf/codegen/cosmos/base/v1beta1/coin'
import { GAS_OVERRIDES, maybeGetNativeTokenForChainId } from '@dao-dao/utils'

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
    private readonly chain: AnyChain
  ) {
    const override =
      this.chain.chainId in GAS_OVERRIDES
        ? GAS_OVERRIDES[this.chain.chainId as keyof typeof GAS_OVERRIDES]
        : undefined

    if (override) {
      this.defaultGasPrice = {
        amount: Decimal.fromUserInput(override.amount.toFixed(18), 18),
        denom: override.denom,
      }
    } else {
      const feeDenom = maybeGetNativeTokenForChainId(
        this.chain.chainId
      )?.denomOrAddress
      if (!feeDenom) {
        throw new Error(`Chain ${chain.chainId} has no fee token`)
      }

      const feeToken = this.chain.chainRegistry?.fees?.fee_tokens.find(
        ({ denom }) => denom === feeDenom
      )

      const gasPriceAmount =
        feeToken?.low_gas_price ??
        feeToken?.average_gas_price ??
        feeToken?.high_gas_price ??
        feeToken?.fixed_min_gas_price ??
        0

      this.defaultGasPrice = {
        amount: Decimal.fromUserInput(Number(gasPriceAmount).toFixed(18), 18),
        denom: feeDenom,
      }
    }
  }

  get dynamicGasPrice(): DecCoin | undefined {
    return this.queryClient.getQueryData(
      chainQueries.dynamicGasPrice({
        chainId: this.chain.chainId,
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
