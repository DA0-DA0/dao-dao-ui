import {
  TokenLine as StatelessTokenLine,
  useCachedLoading,
} from '@dao-dao/stateless'
import { TokenCardInfo, TokenLineProps } from '@dao-dao/types'
import { getDisplayNameForChainId } from '@dao-dao/utils'

import { useWallet } from '../hooks/useWallet'
import { tokenCardLazyInfoSelector } from '../recoil'
import { WalletTokenCard } from './WalletTokenCard'

export const WalletTokenLine = <T extends TokenCardInfo>(
  props: Omit<TokenLineProps<T>, 'TokenCard'>
) => {
  const { address: walletAddress } = useWallet({
    chainId: props.token.chainId,
  })

  const lazyInfo = useCachedLoading(
    walletAddress
      ? tokenCardLazyInfoSelector({
          owner: walletAddress,
          token: props.token,
          unstakedBalance: props.unstakedBalance,
        })
      : undefined,
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
