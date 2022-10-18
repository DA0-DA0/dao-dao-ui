// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useRecoilValue, waitForAll } from 'recoil'

import {
  matchAndLoadCommon,
  useProposalModuleAdapter,
} from '@dao-dao/proposal-module-adapter'
import { useVotingModule, useWalletProfile } from '@dao-dao/state'
import { CheckedDepositInfo } from '@dao-dao/tstypes/contracts/common'
import {
  Loader,
  Logo,
  ProfileCantVoteCard,
  ProfileVoteCard,
  ProfileVotedCard,
  useAppLayoutContext,
  useDaoInfoContext,
} from '@dao-dao/ui'
import { useVotingModuleAdapter } from '@dao-dao/voting-module-adapter'

export interface ProfileProposalCardProps {
  onVoteSuccess: () => void | Promise<void>
}

export const ProfileProposalCard = ({
  onVoteSuccess,
}: ProfileProposalCardProps) => {
  const { t } = useTranslation()
  const { coreAddress, name: daoName, proposalModules } = useDaoInfoContext()
  const { walletProfile, updateProfileName } = useWalletProfile()
  const { updateProfileNft } = useAppLayoutContext()

  const {
    hooks: { useProfileVoteCardOptions, useWalletVoteInfo, useCastVote },
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
            coreAddress,
            Loader,
            Logo,
          }).selectors.depositInfo
      ),
    [coreAddress, proposalModules]
  )
  const proposalModuleDepositInfos = useRecoilValue(
    waitForAll(depositInfoSelectors)
  ).filter(Boolean) as CheckedDepositInfo[]

  const maxProposalModuleDeposit = Math.max(
    ...proposalModuleDepositInfos.map(({ amount }) => Number(amount)),
    0
  )

  // If wallet is a member right now as opposed to when the proposal was open.
  // Relevant for showing them membership join info or not.
  const { isMember = false } = useVotingModule(coreAddress, {
    fetchMembership: true,
  })

  const { totalVotingWeight } = useVotingModule(coreAddress, {
    fetchMembership: true,
  })
  if (totalVotingWeight === undefined) {
    throw new Error(t('error.loadingData'))
  }

  const options = useProfileVoteCardOptions()
  const { vote, couldVote, canVote, votingPowerPercent } = useWalletVoteInfo()

  const commonProps = {
    votingPower: votingPowerPercent,
    daoName,
    walletProfile,
    showUpdateProfileNft: updateProfileNft.toggle,
    updateProfileName,
  }

  const { castVote, castingVote } = useCastVote(onVoteSuccess)

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
        <ProfileCardMemberInfo
          cantVoteOnProposal
          deposit={
            maxProposalModuleDeposit > 0
              ? maxProposalModuleDeposit.toString()
              : undefined
          }
        />
      }
    />
  )
}
