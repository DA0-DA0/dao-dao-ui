import { useWallet } from '@noahsaso/cosmodal'

import {
  TokenLine as StatelessTokenLine,
  useCachedLoading,
} from '@dao-dao/stateless'
import { TokenCardInfo, TokenLineProps } from '@dao-dao/types'

import { tokenCardLazyInfoSelector } from '../recoil'
import { WalletTokenCard } from './WalletTokenCard'

export const WalletTokenLine = <T extends TokenCardInfo>(
  props: Omit<TokenLineProps<T>, 'TokenCard'>
) => {
  const { address: walletAddress, chainInfo } = useWallet()

  const lazyInfo = useCachedLoading(
    walletAddress
      ? tokenCardLazyInfoSelector({
          walletAddress,
          chainId: chainInfo?.chainId,
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
    />
  )
}
