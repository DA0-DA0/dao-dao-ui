import { tokenCardLazyInfoSelector } from '@dao-dao/state/recoil'
import {
  ChainProvider,
  TokenCard as StatelessTokenCard,
  useCachedLoading,
} from '@dao-dao/stateless'
import { TokenCardInfo } from '@dao-dao/types'

import { ButtonLink } from '../ButtonLink'
import { EntityDisplay } from '../EntityDisplay'

export const WalletTokenCardReadonly = (props: TokenCardInfo) => {
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
    <ChainProvider chainId={props.token.chainId}>
      <StatelessTokenCard
        {...props}
        ButtonLink={ButtonLink}
        EntityDisplay={EntityDisplay}
        lazyInfo={lazyInfo}
      />
    </ChainProvider>
  )
}
