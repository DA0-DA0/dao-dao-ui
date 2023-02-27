import { useWallet } from '@noahsaso/cosmodal'

import {
  TokenLine as StatelessTokenLine,
  useCachedLoadable,
} from '@dao-dao/stateless'
import { TokenLineProps } from '@dao-dao/types'
import { loadableToLoadingData } from '@dao-dao/utils'

import { tokenCardLazyInfoSelector } from '../recoil'

export const TokenLine = (props: TokenLineProps) => {
  const { address: walletAddress = '' } = useWallet()

  const lazyInfoLoadable = useCachedLoadable(
    tokenCardLazyInfoSelector({
      walletAddress,
      token: props.token,
    })
  )

  return (
    <StatelessTokenLine
      {...props}
      lazyInfo={loadableToLoadingData(lazyInfoLoadable, {
        usdUnitPrice: undefined,
        stakingInfo: undefined,
      })}
    />
  )
}
