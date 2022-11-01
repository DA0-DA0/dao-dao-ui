// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import { useRouter } from 'next/router'
import { useCallback, useEffect } from 'react'
import { useSetRecoilState } from 'recoil'

import {
  refreshNativeTokenStakingInfoAtom,
  tokenCardLazyInfoSelector,
} from '@dao-dao/state'
import {
  ButtonLink,
  useEncodedCwdProposalSinglePrefill,
} from '@dao-dao/stateful'
import { useActionForKey } from '@dao-dao/stateful/actions'
import {
  TokenCard as StatelessTokenCard,
  useCachedLoadable,
  useDaoInfoContext,
} from '@dao-dao/stateless'
import { ActionKey } from '@dao-dao/types'
import { TokenCardInfo } from '@dao-dao/types/dao'
import { StakeType, loadableToLoadingData, useAddToken } from '@dao-dao/utils'

export const TokenCard = (props: TokenCardInfo) => {
  const router = useRouter()
  const { coreAddress } = useDaoInfoContext()

  const addToken = useAddToken()

  const lazyInfoLoadable = useCachedLoadable(
    tokenCardLazyInfoSelector({
      walletAddress: coreAddress,
      denom: props.tokenDenom,
      tokenDecimals: props.tokenDecimals,
      tokenSymbol: props.tokenSymbol,
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
    refreshNativeTokenStakingInfoAtom(coreAddress)
  )
  const refreshNativeTokenStakingInfo = useCallback(
    () => setRefreshNativeTokenStakingInfo((id) => id + 1),
    [setRefreshNativeTokenStakingInfo]
  )

  const lazyStakes =
    lazyInfoLoadable.state !== 'hasValue'
      ? []
      : lazyInfoLoadable.contents?.stakingInfo?.stakes ?? []

  const stakesWithRewards = lazyStakes.filter(({ rewards }) => rewards > 0)

  const stakeAction = useActionForKey(ActionKey.Stake)
  // Prefill URLs only valid if action exists.
  const prefillValid = !!stakeAction
  const encodedProposalPrefillClaim = useEncodedCwdProposalSinglePrefill({
    actions: stakeAction
      ? stakesWithRewards.map(({ validator: { address } }) => ({
          action: stakeAction,
          data: {
            stakeType: StakeType.WithdrawDelegatorReward,
            validator: address,
            // Default values, not needed for displaying this type of message.
            amount: 1,
            denom: props.tokenDenom,
          },
        }))
      : [],
  })
  const encodedProposalPrefillStakeUnstake = useEncodedCwdProposalSinglePrefill(
    {
      // If has unstaked, show stake action by default.
      actions: stakeAction
        ? props.unstakedBalance > 0
          ? [
              {
                action: stakeAction,
                data: {
                  stakeType: StakeType.Delegate,
                  validator: '',
                  amount: props.unstakedBalance,
                  denom: props.tokenDenom,
                },
              },
            ]
          : // If has only staked, show unstake actions by default.
            lazyStakes.map(({ validator, amount }) => ({
              action: stakeAction,
              data: {
                stakeType: StakeType.Undelegate,
                validator,
                amount,
                denom: props.tokenDenom,
              },
            }))
        : [],
    }
  )

  const proposeClaimHref =
    prefillValid && stakesWithRewards.length > 0 && encodedProposalPrefillClaim
      ? `/dao/${coreAddress}/proposals/create?prefill=${encodedProposalPrefillClaim}`
      : undefined

  const proposeStakeUnstakeHref =
    prefillValid &&
    (props.unstakedBalance > 0 || lazyStakes.length > 0) &&
    encodedProposalPrefillStakeUnstake
      ? `/dao/${coreAddress}/proposals/create?prefill=${encodedProposalPrefillStakeUnstake}`
      : undefined

  const onAddToken =
    addToken && props.cw20Address
      ? () => props.cw20Address && addToken(props.cw20Address)
      : undefined

  const onClaim = proposeClaimHref
    ? () => router.push(proposeClaimHref)
    : undefined

  return (
    <StatelessTokenCard
      {...props}
      ButtonLink={ButtonLink}
      lazyInfo={loadableToLoadingData(lazyInfoLoadable, {
        usdcUnitPrice: undefined,
        stakingInfo: undefined,
      })}
      onAddToken={onAddToken}
      onClaim={onClaim}
      proposeClaimHref={proposeClaimHref}
      proposeStakeUnstakeHref={proposeStakeUnstakeHref}
      refreshUnstakingTasks={refreshNativeTokenStakingInfo}
    />
  )
}
