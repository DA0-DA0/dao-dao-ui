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
  const { address: walletAddress } = useWallet()

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
    />
  )
}
