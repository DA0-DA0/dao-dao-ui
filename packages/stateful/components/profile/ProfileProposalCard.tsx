import { useMemo } from 'react'
import { useSetRecoilState, waitForAll } from 'recoil'

import { HugeDecimal } from '@dao-dao/math'
import { updateProfileNftVisibleAtom } from '@dao-dao/state/recoil'
import {
  Loader,
  ProfileCantVoteCard,
  ProfileCreatePermitCard,
  ProfileVoteCard,
  useCachedLoadable,
} from '@dao-dao/stateless'
import { CheckedDepositInfo } from '@dao-dao/types/contracts/common'

import {
  useDaoGovernanceToken,
  useDaoWithWalletSecretNetworkPermit,
  useManageProfile,
  useMembership,
} from '../../hooks'
import {
  matchAndLoadCommon,
  useProposalModuleAdapter,
} from '../../proposal-module-adapter'
import { useVotingModuleAdapter } from '../../voting-module-adapter'
import { CreateDaoPermit } from '../dao'
import { SuspenseLoader } from '../SuspenseLoader'

export const ProfileProposalCard = () => {
  const { dao, isSecretNetworkPermitNeeded } =
    useDaoWithWalletSecretNetworkPermit()
  const {
    profile,
    updateProfile: { go: updateProfile },
  } = useManageProfile()
  const setUpdateProfileNftVisible = useSetRecoilState(
    updateProfileNftVisibleAtom
  )

  const {
    hooks: { useLoadingWalletVoteInfo },
    components: { ProposalWalletVote },
  } = useProposalModuleAdapter()

  const {
    components: { ProfileCardMemberInfo },
  } = useVotingModuleAdapter()

  const depositInfoSelectors = useMemo(
    () =>
      dao.proposalModules.map(
        (proposalModule) =>
          matchAndLoadCommon(dao, proposalModule.address).selectors.depositInfo
      ),
    [dao]
  )
  const proposalModuleDepositInfosLoadable = useCachedLoadable(
    waitForAll(depositInfoSelectors)
  )

  const { denomOrAddress: governanceDenomOrAddress } =
    useDaoGovernanceToken() ?? {}

  // Get max deposit of governance token across all proposal modules.
  const maxGovernanceTokenProposalModuleDeposit =
    proposalModuleDepositInfosLoadable.state !== 'hasValue'
      ? HugeDecimal.zero
      : proposalModuleDepositInfosLoadable.contents
          .filter(
            (depositInfo): depositInfo is CheckedDepositInfo =>
              !!depositInfo &&
              ('cw20' in depositInfo.denom
                ? depositInfo.denom.cw20
                : depositInfo.denom.native) === governanceDenomOrAddress
          )
          // Get max.
          .reduce(
            (acc, { amount }) =>
              acc.gt(amount) ? acc : HugeDecimal.from(amount),
            HugeDecimal.zero
          )

  // If wallet is a member right now as opposed to when the proposal was open.
  // Relevant for showing them membership join info or not.
  const { isMember = false } = useMembership()

  const loadingWalletVoteInfo = useLoadingWalletVoteInfo()

  if (isSecretNetworkPermitNeeded) {
    return (
      <ProfileCreatePermitCard
        CreatePermit={CreateDaoPermit}
        profile={profile}
      />
    )
  }

  // This card should only display when a wallet is connected. The wallet vote
  // info hook returns undefined when there is no wallet connected. If we are
  // here and there is no wallet connected, something is probably just loading,
  // maybe the wallet is reconnecting.
  if (!loadingWalletVoteInfo || loadingWalletVoteInfo.loading) {
    return null
  }

  const { vote, couldVote, canVote, votingPowerPercent } =
    loadingWalletVoteInfo.data

  const commonProps = {
    votingPower: votingPowerPercent,
    daoName: dao.name,
    profile,
    showUpdateProfileNft: () => setUpdateProfileNftVisible(true),
    updateProfile,
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
            maxGovernanceTokenDeposit={
              maxGovernanceTokenProposalModuleDeposit.isPositive()
                ? maxGovernanceTokenProposalModuleDeposit.toString()
                : undefined
            }
          />
        </SuspenseLoader>
      }
    />
  )
}
