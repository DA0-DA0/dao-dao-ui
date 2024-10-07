import { useQueryClient } from '@tanstack/react-query'

import { HugeDecimal } from '@dao-dao/math'
import { tokenQueries } from '@dao-dao/state/query'
import {
  TokenAmountDisplay as StatelessTokenAmountDisplay,
  useChain,
} from '@dao-dao/stateless'
import {
  GenericToken,
  StatefulTokenAmountDisplayProps,
  TokenType,
} from '@dao-dao/types'

import { useQueryLoadingData } from '../hooks'

/**
 * Automatically show a native coin token amount.
 */
export const TokenAmountDisplay = ({
  coin: { amount, denom },
  ...props
}: StatefulTokenAmountDisplayProps) => {
  const { chain_id: chainId } = useChain()
  const queryClient = useQueryClient()

  const loadingGenericToken = useQueryLoadingData<
    GenericToken,
    GenericToken | undefined
  >(
    tokenQueries.info(queryClient, {
      type: TokenType.Native,
      denomOrAddress: denom,
      chainId,
    }),
    undefined
  )

  return (
    <StatelessTokenAmountDisplay
      amount={
        loadingGenericToken.loading || !loadingGenericToken.data
          ? { loading: true }
          : {
              loading: false,
              data: HugeDecimal.from(amount),
            }
      }
      decimals={
        loadingGenericToken.loading || !loadingGenericToken.data
          ? 0
          : loadingGenericToken.data.decimals
      }
      iconUrl={
        (!loadingGenericToken.loading && loadingGenericToken.data?.imageUrl) ||
        undefined
      }
      symbol={
        loadingGenericToken.loading || !loadingGenericToken.data
          ? '...'
          : loadingGenericToken.data.symbol
      }
      {...props}
    />
  )
}
