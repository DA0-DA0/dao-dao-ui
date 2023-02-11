import { useWallet } from '@noahsaso/cosmodal'
import { useCallback, useEffect } from 'react'
import { useSetRecoilState } from 'recoil'

import { refreshNativeTokenStakingInfoAtom } from '@dao-dao/state'
import {
  TokenCard as StatelessTokenCard,
  useCachedLoadable,
} from '@dao-dao/stateless'
import { TokenCardInfo, TokenType } from '@dao-dao/types'
import { loadableToLoadingData, useAddToken } from '@dao-dao/utils'

import { tokenCardLazyInfoSelector } from '../recoil'
import { ButtonLink } from './ButtonLink'

export const WalletTokenCard = (props: TokenCardInfo) => {
  const { address: walletAddress = '' } = useWallet()

  const addToken = useAddToken()

  const lazyInfoLoadable = useCachedLoadable(
    tokenCardLazyInfoSelector({
      walletAddress,
      token: props.token,
    })
  )

  //! Loadable errors.
  useEffect(() => {
    if (lazyInfoLoadable.state === 'hasError') {
      console.error(lazyInfoLoadable.contents)
    }
  }, [lazyInfoLoadable.contents, lazyInfoLoadable.state])

  // Refresh staking info.
  const setRefreshNativeTokenStakingInfo = useSetRecoilState(
    refreshNativeTokenStakingInfoAtom(walletAddress)
  )
  const refreshNativeTokenStakingInfo = useCallback(
    () => setRefreshNativeTokenStakingInfo((id) => id + 1),
    [setRefreshNativeTokenStakingInfo]
  )

  const onAddToken =
    addToken && props.token.type === TokenType.Cw20
      ? () => props.token.denomOrAddress && addToken(props.token.denomOrAddress)
      : undefined

  return (
    <>
      <StatelessTokenCard
        {...props}
        ButtonLink={ButtonLink}
        lazyInfo={loadableToLoadingData(lazyInfoLoadable, {
          usdcUnitPrice: undefined,
          stakingInfo: undefined,
        })}
        onAddToken={onAddToken}
        refreshUnstakingTasks={refreshNativeTokenStakingInfo}
      />
    </>
  )
}
