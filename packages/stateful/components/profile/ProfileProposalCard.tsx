import { useMemo } from 'react'
import { waitForAll } from 'recoil'

import {
  Loader,
  ProfileCantVoteCard,
  ProfileDisconnectedCard,
  ProfileVoteCard,
  ProfileVotedCard,
  useAppLayoutContext,
  useCachedLoadable,
  useDaoInfoContext,
} from '@dao-dao/stateless'
import { CheckedDepositInfo } from '@dao-dao/types/contracts/common'

import { useMembership, useWalletInfo } from '../../hooks'
import {
  matchAndLoadCommon,
  useProposalModuleAdapter,
} from '../../proposal-module-adapter'
import { useVotingModuleAdapter } from '../../voting-module-adapter'
import { SuspenseLoader } from '../SuspenseLoader'

export interface ProfileProposalCardProps {
  onVoteSuccess: () => void | Promise<void>
}

export const ProfileProposalCard = ({
  onVoteSuccess,
}: ProfileProposalCardProps) => {
  const {
    chainId,
    coreAddress,
    name: daoName,
    proposalModules,
  } = useDaoInfoContext()
  const { walletProfile, updateProfileName } = useWalletInfo()
  const { updateProfileNft } = useAppLayoutContext()

  const {
    hooks: { useProfileVoteCardOptions, useLoadingWalletVoteInfo, useCastVote },
    components: { ProposalWalletVote },
  } = useProposalModuleAdapter()
  const {
    components: { ProfileCardMemberInfo },
  } = useVotingModuleAdapter()

  const depositInfoSelectors = useMemo(
    () =>
      proposalModules.map(
        (proposalModule) =>
          matchAndLoadCommon(proposalModule, {
            chainId,
            coreAddress,
          }).selectors.depositInfo
      ),
    [chainId, coreAddress, proposalModules]
  )
  const proposalModuleDepositInfosLoadable = useCachedLoadable(
    waitForAll(depositInfoSelectors)
  )

  const maxProposalModuleDeposit =
    proposalModuleDepositInfosLoadable.state !== 'hasValue'
      ? 0
      : Math.max(
          ...(
            proposalModuleDepositInfosLoadable.contents.filter(
              Boolean
            ) as CheckedDepositInfo[]
          ).map(({ amount }) => Number(amount)),
          0
        )

  // If wallet is a member right now as opposed to when the proposal was open.
  // Relevant for showing them membership join info or not.
  const { isMember = false } = useMembership({
    coreAddress,
    chainId,
  })

  const options = useProfileVoteCardOptions()
  const loadingWalletVoteInfo = useLoadingWalletVoteInfo()
  const { castVote, castingVote } = useCastVote(onVoteSuccess)

  // This card should only display when a wallet is connected. The wallet vote
  // info hook returns undefined when there is no wallet connected. If we are
  // here and there is no wallet connected, something is probably just loading,
  // maybe the wallet is reconnecting. It is safe to return a loader.
  if (!loadingWalletVoteInfo || loadingWalletVoteInfo.loading) {
    return <ProfileDisconnectedCard className="animate-pulse" />
  }

  const { vote, couldVote, canVote, votingPowerPercent } =
    loadingWalletVoteInfo.data

  const commonProps = {
    votingPower: votingPowerPercent,
    daoName,
    walletProfile,
    showUpdateProfileNft: updateProfileNft.toggle,
    updateProfileName,
  }

  return canVote ? (
    <ProfileVoteCard
      currentVote={vote}
      currentVoteDisplay={
        // Fallback to pending since they can vote.
        <ProposalWalletVote fallback="pending" vote={vote} />
      }
      loading={castingVote}
      onCastVote={castVote}
      options={options}
      {...commonProps}
    />
  ) : couldVote ? (
    <ProfileVotedCard
      {...commonProps}
      vote={
        // Fallback to none since they can no longer vote.
        <ProposalWalletVote fallback="none" vote={vote} />
      }
    />
  ) : (
    <ProfileCantVoteCard
      {...commonProps}
      isMember={isMember}
      membershipInfo={
        <SuspenseLoader fallback={<Loader size={24} />}>
          <ProfileCardMemberInfo
            cantVoteOnProposal
            deposit={
              maxProposalModuleDeposit > 0
                ? maxProposalModuleDeposit.toString()
                : undefined
            }
          />
        </SuspenseLoader>
      }
    />
  )
}
