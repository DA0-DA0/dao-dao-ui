import { useMemo } from 'react'
import { waitForAll } from 'recoil'

import {
  Loader,
  ProfileCantVoteCard,
  ProfileVoteCard,
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
import { ProfileDisconnectedCard } from './ProfileDisconnectedCard'

export interface ProfileProposalCardProps {
  onVoteSuccess: () => void | Promise<void>
}

export const ProfileProposalCard = () => {
  const {
    chainId,
    coreAddress,
    name: daoName,
    proposalModules,
  } = useDaoInfoContext()
  const { walletProfile, updateProfileName } = useWalletInfo()
  const { updateProfileNft } = useAppLayoutContext()

  const {
    hooks: { useLoadingWalletVoteInfo },
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

  const loadingWalletVoteInfo = useLoadingWalletVoteInfo()

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

  return couldVote ? (
    <ProfileVoteCard
      {...commonProps}
      vote={
        <ProposalWalletVote
          fallback={
            // If they can vote, fallback to pending to indicate that they still
            // have to vote.
            canVote ? 'pending' : 'hasNoVote'
          }
          vote={vote}
        />
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
