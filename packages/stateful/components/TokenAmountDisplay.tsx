import { HugeDecimal } from '@dao-dao/math'
import { genericTokenSelector } from '@dao-dao/state/recoil'
import {
  TokenAmountDisplay as StatelessTokenAmountDisplay,
  useCachedLoading,
  useChain,
} from '@dao-dao/stateless'
import { StatefulTokenAmountDisplayProps, TokenType } from '@dao-dao/types'

/**
 * Automatically show a native coin token amount.
 */
export const TokenAmountDisplay = ({
  coin: { amount, denom },
  ...props
}: StatefulTokenAmountDisplayProps) => {
  const { chain_id: chainId } = useChain()

  const loadingGenericToken = useCachedLoading(
    genericTokenSelector({
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
              data: HugeDecimal.from(amount).toHumanReadableNumber(
                loadingGenericToken.data.decimals
              ),
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
