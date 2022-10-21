// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import { useRouter } from 'next/router'
import { useCallback, useEffect } from 'react'
import { useSetRecoilState } from 'recoil'

import { useActionForKey } from '@dao-dao/actions'
import { useEncodedCwdProposalSinglePrefill } from '@dao-dao/common'
import {
  refreshNativeTokenStakingInfoAtom,
  tokenCardLazyStakingInfoSelector,
} from '@dao-dao/state'
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

  const lazyStakingInfoLoadable = useCachedLoadable(
    props.hasStakingInfo
      ? tokenCardLazyStakingInfoSelector({
          walletAddress: coreAddress,
          denom: props.tokenDenom,
          tokenDecimals: props.tokenDecimals,
          tokenSymbol: props.tokenSymbol,
        })
      : undefined
  )

  //! Loadable errors.
  useEffect(() => {
    if (lazyStakingInfoLoadable.state === 'hasError') {
      console.error(lazyStakingInfoLoadable.contents)
    }
  }, [lazyStakingInfoLoadable.contents, lazyStakingInfoLoadable.state])

  // Refresh staking info.
  const setRefreshNativeTokenStakingInfo = useSetRecoilState(
    refreshNativeTokenStakingInfoAtom(coreAddress)
  )
  const refreshNativeTokenStakingInfo = useCallback(
    () => setRefreshNativeTokenStakingInfo((id) => id + 1),
    [setRefreshNativeTokenStakingInfo]
  )

  const lazyStakes =
    lazyStakingInfoLoadable.state !== 'hasValue'
      ? []
      : lazyStakingInfoLoadable.contents?.stakes ?? []

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

  useEffect(() => {
    if (!prefillValid) {
      return
    }

    router.prefetch(
      `/dao/${coreAddress}/proposals/create?prefill=${encodedProposalPrefillClaim}`
    )
    router.prefetch(
      `/dao/${coreAddress}/proposals/create?prefill=${encodedProposalPrefillStakeUnstake}`
    )
  }, [
    coreAddress,
    encodedProposalPrefillClaim,
    encodedProposalPrefillStakeUnstake,
    prefillValid,
    router,
  ])

  return (
    <StatelessTokenCard
      {...props}
      lazyStakingInfo={
        props.hasStakingInfo
          ? loadableToLoadingData(lazyStakingInfoLoadable, undefined)
          : { loading: false, data: undefined }
      }
      onAddToken={
        addToken && props.cw20Address
          ? () => props.cw20Address && addToken(props.cw20Address)
          : undefined
      }
      onProposeClaim={
        prefillValid &&
        stakesWithRewards.length > 0 &&
        encodedProposalPrefillClaim
          ? () =>
              router.push(
                `/dao/${coreAddress}/proposals/create?prefill=${encodedProposalPrefillClaim}`
              )
          : undefined
      }
      onProposeStakeUnstake={
        prefillValid &&
        (props.unstakedBalance > 0 || lazyStakes.length > 0) &&
        encodedProposalPrefillStakeUnstake
          ? () =>
              router.push(
                `/dao/${coreAddress}/proposals/create?prefill=${encodedProposalPrefillStakeUnstake}`
              )
          : undefined
      }
      refreshUnstakingTasks={refreshNativeTokenStakingInfo}
    />
  )
}
