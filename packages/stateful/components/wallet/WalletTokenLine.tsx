import { tokenCardLazyInfoSelector } from '@dao-dao/state/recoil'
import {
  TokenLine as StatelessTokenLine,
  useCachedLoading,
} from '@dao-dao/stateless'
import { TokenCardInfo, TokenLineProps } from '@dao-dao/types'
import { getDisplayNameForChainId } from '@dao-dao/utils'

import { WalletTokenCard } from './WalletTokenCard'

export const WalletTokenLine = <T extends TokenCardInfo>(
  props: Omit<TokenLineProps<T>, 'TokenCard'>
) => {
  const lazyInfo = useCachedLoading(
    tokenCardLazyInfoSelector({
      owner: props.owner.address,
      token: props.token,
      unstakedBalance: props.unstakedBalance.toString(),
    }),
    {
      usdUnitPrice: undefined,
      stakingInfo: undefined,
      totalBalance: props.unstakedBalance,
    }
  )

  return (
    <StatelessTokenLine
      {...props}
      TokenCard={WalletTokenCard}
      lazyInfo={lazyInfo}
      subtitle={getDisplayNameForChainId(props.token.chainId)}
    />
  )
}
