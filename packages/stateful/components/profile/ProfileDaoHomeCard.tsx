import { useWallet } from '@noahsaso/cosmodal'
import React, { useMemo } from 'react'
import { waitForAll } from 'recoil'

import {
  ProfileDisconnectedCard,
  SuspenseLoader,
  useMembership,
  useWalletInfo,
} from '@dao-dao/stateful'
import { matchAndLoadCommon } from '@dao-dao/stateful/proposal-module-adapter'
import { useVotingModuleAdapter } from '@dao-dao/stateful/voting-module-adapter'
import {
  Loader,
  ProfileMemberCard,
  ProfileNotMemberCard,
  useAppLayoutContext,
  useCachedLoadable,
  useDaoInfoContext,
} from '@dao-dao/stateless'
import { CheckedDepositInfo } from '@dao-dao/types/contracts/common'

// This is the card shown when viewing a DAO's home page.
export const ProfileDaoHomeCard = () => {
  const { connected } = useWallet()
  const { walletProfile, updateProfileName } = useWalletInfo()
  const { updateProfileNft } = useAppLayoutContext()

  const daoInfo = useDaoInfoContext()
  const {
    components: { ProfileCardMemberInfo },
    hooks: { useCommonGovernanceTokenInfo },
  } = useVotingModuleAdapter()
  const { isMember } = useMembership(daoInfo)

  const depositInfoSelectors = useMemo(
    () =>
      daoInfo.proposalModules.map(
        (proposalModule) =>
          matchAndLoadCommon(proposalModule, {
            chainId: daoInfo.chainId,
            coreAddress: daoInfo.coreAddress,
          }).selectors.depositInfo
      ),
    [daoInfo.chainId, daoInfo.coreAddress, daoInfo.proposalModules]
  )
  const proposalModuleDepositInfosLoadable = useCachedLoadable(
    waitForAll(depositInfoSelectors)
  )

  const { denomOrAddress: governanceDenomOrAddress } =
    useCommonGovernanceTokenInfo?.() ?? {}

  // Get max deposit of governance token across all proposal modules.
  const maxGovernanceTokenProposalModuleDeposit =
    proposalModuleDepositInfosLoadable.state !== 'hasValue'
      ? 0
      : Math.max(
          ...proposalModuleDepositInfosLoadable.contents
            .filter(
              (depositInfo): depositInfo is CheckedDepositInfo =>
                !!depositInfo &&
                ('cw20' in depositInfo.denom
                  ? depositInfo.denom.cw20
                  : depositInfo.denom.native) === governanceDenomOrAddress
            )
            .map(({ amount }) => Number(amount)),
          0
        )

  return connected ? (
    // If membership not yet loaded, show loading skeleton.
    isMember === undefined ? (
      <ProfileDisconnectedCard className="animate-pulse" />
    ) : isMember ? (
      <ProfileMemberCard
        daoName={daoInfo.name}
        membershipInfo={
          <SuspenseLoader fallback={<Loader size={24} />}>
            <ProfileCardMemberInfo
              maxGovernanceTokenDeposit={
                maxGovernanceTokenProposalModuleDeposit > 0
                  ? maxGovernanceTokenProposalModuleDeposit.toString()
                  : undefined
              }
            />
          </SuspenseLoader>
        }
        showUpdateProfileNft={updateProfileNft.toggle}
        updateProfileName={updateProfileName}
        walletProfile={walletProfile}
      />
    ) : (
      <ProfileNotMemberCard
        daoName={daoInfo.name}
        membershipInfo={
          <SuspenseLoader fallback={<Loader size={24} />}>
            <ProfileCardMemberInfo
              maxGovernanceTokenDeposit={
                maxGovernanceTokenProposalModuleDeposit > 0
                  ? maxGovernanceTokenProposalModuleDeposit.toString()
                  : undefined
              }
            />
          </SuspenseLoader>
        }
        showUpdateProfileNft={updateProfileNft.toggle}
        updateProfileName={updateProfileName}
        walletProfile={walletProfile}
      />
    )
  ) : (
    <ProfileDisconnectedCard />
  )
}
