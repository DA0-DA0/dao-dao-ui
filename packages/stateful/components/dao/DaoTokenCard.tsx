import {
  AccountBalance,
  ArchiveRounded,
  PaidRounded,
} from '@mui/icons-material'
import { useRouter } from 'next/router'
import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSetRecoilState } from 'recoil'

import { refreshNativeTokenStakingInfoAtom } from '@dao-dao/state'
import {
  ChainProvider,
  TokenCard as StatelessTokenCard,
  useCachedLoading,
  useDaoInfoContext,
  useDaoNavHelpers,
} from '@dao-dao/stateless'
import { ActionKey, ButtonPopupSection, TokenCardInfo } from '@dao-dao/types'
import {
  StakingActionType,
  getDaoProposalSinglePrefill,
  getDisplayNameForChainId,
  getNativeTokenForChainId,
} from '@dao-dao/utils'

import { tokenCardLazyInfoSelector } from '../../recoil'
import { useVotingModuleAdapter } from '../../voting-module-adapter'
import { ButtonLink } from '../ButtonLink'
import { EntityDisplay } from '../EntityDisplay'
import { DaoTokenDepositModal } from './DaoTokenDepositModal'

export const DaoTokenCard = (props: TokenCardInfo) => {
  const { t } = useTranslation()
  const router = useRouter()
  const { coreAddress } = useDaoInfoContext()
  const { getDaoProposalPath } = useDaoNavHelpers()

  const lazyInfo = useCachedLoading(
    tokenCardLazyInfoSelector({
      owner: props.owner,
      token: props.token,
      unstakedBalance: props.unstakedBalance,
    }),
    {
      usdUnitPrice: undefined,
      stakingInfo: undefined,
      totalBalance: props.unstakedBalance,
    }
  )

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
    refreshNativeTokenStakingInfoAtom(props.owner)
  )
  const refreshNativeTokenStakingInfo = useCallback(
    () => setRefreshNativeTokenStakingInfo((id) => id + 1),
    [setRefreshNativeTokenStakingInfo]
  )

  const lazyStakes = lazyInfo.loading
    ? []
    : lazyInfo.data.stakingInfo?.stakes ?? []
  const stakesWithRewards = lazyStakes.filter(({ rewards }) => rewards > 0)

  const nativeToken = getNativeTokenForChainId(props.token.chainId)

  // Prefill URLs valid...
  const proposeClaimHref =
    // ...there is something to claim
    stakesWithRewards.length > 0 &&
    // ...and this is the native token
    props.token.denomOrAddress === nativeToken.denomOrAddress
      ? getDaoProposalPath(coreAddress, 'create', {
          prefill: getDaoProposalSinglePrefill({
            actions: stakesWithRewards.map(({ validator: { address } }) => ({
              actionKey: ActionKey.ManageStaking,
              data: {
                chainId: props.token.chainId,
                stakeType: StakingActionType.WithdrawDelegatorReward,
                validator: address,
                // Default values, not needed for displaying this type of message.
                amount: 1,
                denom: props.token.denomOrAddress,
              },
            })),
          }),
        })
      : undefined

  // Prefill URL is valid if...
  const proposeStakeUnstakeHref =
    // ...there is something to stake or unstake
    (props.unstakedBalance > 0 || lazyStakes.length > 0) &&
    // ...and this is the native token
    props.token.denomOrAddress === nativeToken.denomOrAddress
      ? getDaoProposalPath(coreAddress, 'create', {
          prefill: getDaoProposalSinglePrefill({
            // If has unstaked, show stake action by default.
            actions:
              props.unstakedBalance > 0
                ? [
                    {
                      actionKey: ActionKey.ManageStaking,
                      data: {
                        chainId: props.token.chainId,
                        stakeType: StakingActionType.Delegate,
                        validator: '',
                        amount: props.unstakedBalance,
                        denom: props.token.denomOrAddress,
                      },
                    },
                  ]
                : // If has only staked, show unstake actions by default.
                  lazyStakes.map(({ validator, amount }) => ({
                    actionKey: ActionKey.ManageStaking,
                    data: {
                      chainId: props.token.chainId,
                      stakeType: StakingActionType.Undelegate,
                      validator,
                      amount,
                      denom: props.token.denomOrAddress,
                    },
                  })),
          }),
        })
      : undefined

  const onClaim = proposeClaimHref
    ? () => router.push(proposeClaimHref)
    : undefined

  const [depositVisible, setDepositVisible] = useState(false)
  const showDeposit = useCallback(() => setDepositVisible(true), [])

  const [showCw20StakingModal, setShowCw20StakingModal] = useState(false)

  const extraActionSections: ButtonPopupSection[] =
    proposeStakeUnstakeHref || proposeClaimHref
      ? [
          {
            label: t('title.newProposalTo'),
            buttons: [
              ...(proposeStakeUnstakeHref
                ? [
                    {
                      Icon: ArchiveRounded,
                      label: t('button.stakeOrUnstake'),
                      closeOnClick: true,
                      href: proposeStakeUnstakeHref,
                    },
                  ]
                : []),
              ...(proposeClaimHref
                ? [
                    {
                      Icon: PaidRounded,
                      label: t('button.claimStakingRewards'),
                      closeOnClick: true,
                      href: proposeClaimHref,
                    },
                  ]
                : []),
            ],
          },
        ]
      : []

  return (
    <ChainProvider chainId={props.token.chainId}>
      <StatelessTokenCard
        {...props}
        ButtonLink={ButtonLink}
        EntityDisplay={EntityDisplay}
        actions={{
          token: isCw20GovernanceToken
            ? [
                // If this is the governance token and a CW20, show manage
                // staking button.
                {
                  Icon: AccountBalance,
                  label: t('button.manageStake', {
                    tokenSymbol: props.token.symbol,
                  }),
                  closeOnClick: true,
                  onClick: () => setShowCw20StakingModal(true),
                },
              ]
            : // Only show deposit button if not governance cw20 token. People
              // accidentally deposit governance tokens into the DAO when
              // they're trying to stake them.
              [
                {
                  Icon: AccountBalance,
                  label: t('button.deposit'),
                  closeOnClick: true,
                  onClick: showDeposit,
                },
              ],
          extraSections: extraActionSections,
        }}
        lazyInfo={lazyInfo}
        onClaim={onClaim}
        refreshUnstakingTasks={refreshNativeTokenStakingInfo}
        subtitle={getDisplayNameForChainId(props.token.chainId)}
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
    </ChainProvider>
  )
}
