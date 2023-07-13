import { genericTokenSelector } from '@dao-dao/state/recoil'
import {
  TokenAmountDisplay as StatelessTokenAmountDisplay,
  useCachedLoading,
} from '@dao-dao/stateless'
import { StatefulTokenAmountDisplayProps, TokenType } from '@dao-dao/types'
import { convertMicroDenomToDenomWithDecimals } from '@dao-dao/utils'

export const TokenAmountDisplay = ({
  coin: { amount, denom },
  ...props
}: StatefulTokenAmountDisplayProps) => {
  const loadingGenericToken = useCachedLoading(
    genericTokenSelector({
      type: TokenType.Native,
      denomOrAddress: denom,
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
              data: convertMicroDenomToDenomWithDecimals(
                amount,
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
