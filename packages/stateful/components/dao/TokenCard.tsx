import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { useSetRecoilState } from 'recoil'

import { refreshNativeTokenStakingInfoAtom } from '@dao-dao/state'
import {
  TokenCard as StatelessTokenCard,
  useCachedLoadable,
  useDaoInfoContext,
  useNavHelpers,
} from '@dao-dao/stateless'
import { CoreActionKey, TokenCardInfo } from '@dao-dao/types'
import {
  NATIVE_DENOM,
  StakeType,
  loadableToLoadingData,
  useAddToken,
} from '@dao-dao/utils'

import { useCoreActionForKey } from '../../actions'
import { useDaoProposalSinglePrefill } from '../../hooks'
import { tokenCardLazyInfoSelector } from '../../recoil'
import { useVotingModuleAdapter } from '../../voting-module-adapter'
import { ButtonLink } from '../ButtonLink'
import { DaoTokenDepositModal } from './DaoTokenDepositModal'

export const TokenCard = (props: TokenCardInfo) => {
  const router = useRouter()
  const { coreAddress } = useDaoInfoContext()
  const { getDaoProposalPath } = useNavHelpers()

  const addToken = useAddToken()

  const lazyInfoLoadable = useCachedLoadable(
    tokenCardLazyInfoSelector({
      walletAddress: coreAddress,
      token: props.token,
    })
  )

  //! Loadable errors.
  useEffect(() => {
    if (lazyInfoLoadable.state === 'hasError') {
      console.error(lazyInfoLoadable.contents)
    }
  }, [lazyInfoLoadable.contents, lazyInfoLoadable.state])

  const {
    hooks: { useCommonGovernanceTokenInfo },
    components: { StakingModal },
  } = useVotingModuleAdapter()
  const governanceInfo = useCommonGovernanceTokenInfo?.()
  // If this token is the CW20 governance token for the DAO, hide deposit and
  // show staking modal.
  const isCw20GovernanceToken =
    props.token.type === 'cw20' &&
    props.token.denomOrAddress === governanceInfo?.denomOrAddress

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

  const stakeAction = useCoreActionForKey(CoreActionKey.StakingActions)

  // Does not get used if not native token.
  const proposalPrefillClaim = useDaoProposalSinglePrefill({
    actions: stakeAction
      ? stakesWithRewards.map(({ validator: { address } }) => ({
          action: stakeAction,
          data: {
            stakeType: StakeType.WithdrawDelegatorReward,
            validator: address,
            // Default values, not needed for displaying this type of message.
            amount: 1,
            denom: props.token.denomOrAddress,
          },
        }))
      : [],
  })
  // Does not get used if not native token.
  const proposalPrefillStakeUnstake = useDaoProposalSinglePrefill({
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
                denom: props.token.denomOrAddress,
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
              denom: props.token.denomOrAddress,
            },
          }))
      : [],
  })

  const proposeClaimHref =
    // Prefill URLs valid if action exists,
    !!stakeAction &&
    // ...if there is something to claim,
    stakesWithRewards.length > 0 &&
    // ...if there is a valid prefill (meaning proposal module adapter exists)
    proposalPrefillClaim &&
    props.token.denomOrAddress === NATIVE_DENOM
      ? getDaoProposalPath(coreAddress, 'create', {
          prefill: proposalPrefillClaim,
        })
      : undefined

  const proposeStakeUnstakeHref =
    // Prefill URLs valid if action exists,
    !!stakeAction &&
    // ...if there is something to stake or unstake,
    (props.unstakedBalance > 0 || lazyStakes.length > 0) &&
    // ...if there is a valid prefill (meaning proposal module adapter exists)
    proposalPrefillStakeUnstake &&
    props.token.denomOrAddress === NATIVE_DENOM
      ? getDaoProposalPath(coreAddress, 'create', {
          prefill: proposalPrefillStakeUnstake,
        })
      : undefined

  const onAddToken =
    addToken && props.token.type === 'cw20'
      ? () => props.token.denomOrAddress && addToken(props.token.denomOrAddress)
      : undefined

  const onClaim = proposeClaimHref
    ? () => router.push(proposeClaimHref)
    : undefined

  const [depositVisible, setDepositVisible] = useState(false)
  const showDeposit = useCallback(() => setDepositVisible(true), [])

  const [showCw20StakingModal, setShowCw20StakingModal] = useState(false)

  return (
    <>
      <StatelessTokenCard
        {...props}
        ButtonLink={ButtonLink}
        lazyInfo={loadableToLoadingData(lazyInfoLoadable, {
          usdcUnitPrice: undefined,
          stakingInfo: undefined,
        })}
        manageCw20Stake={
          // If this is the governance token and a CW20, show manage staking
          // button.
          isCw20GovernanceToken
            ? () => setShowCw20StakingModal(true)
            : undefined
        }
        onAddToken={onAddToken}
        onClaim={onClaim}
        proposeClaimHref={proposeClaimHref}
        proposeStakeUnstakeHref={proposeStakeUnstakeHref}
        refreshUnstakingTasks={refreshNativeTokenStakingInfo}
        showDeposit={
          // If this is the governance token and a CW20, don't show deposit
          // button. People accidentally deposit governance tokens into the DAO
          // when they're trying to stake them.
          isCw20GovernanceToken ? undefined : showDeposit
        }
      />

      {isCw20GovernanceToken && showCw20StakingModal && StakingModal && (
        <StakingModal onClose={() => setShowCw20StakingModal(false)} />
      )}

      {!isCw20GovernanceToken && (
        <DaoTokenDepositModal
          onClose={() => setDepositVisible(false)}
          token={props.token}
          visible={depositVisible}
        />
      )}
    </>
  )
}
