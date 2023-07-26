import { useMemo } from 'react'
import { useSetRecoilState, waitForAll } from 'recoil'

import { updateProfileNftVisibleAtom } from '@dao-dao/state/recoil'
import { matchAndLoadCommon } from '@dao-dao/stateful/proposal-module-adapter'
import { useVotingModuleAdapter } from '@dao-dao/stateful/voting-module-adapter'
import {
  Loader,
  ProfileMemberCard,
  ProfileNotMemberCard,
  useCachedLoadable,
  useChain,
  useDaoInfoContext,
} from '@dao-dao/stateless'
import { CheckedDepositInfo } from '@dao-dao/types/contracts/common'

import { useMembership, useWallet, useWalletInfo } from '../../hooks'
import { SuspenseLoader } from '../SuspenseLoader'
import { ProfileDisconnectedCard } from './ProfileDisconnectedCard'

// This is the card shown when viewing a DAO's home page.
export const ProfileDaoHomeCard = () => {
  const chain = useChain()
  const { isWalletConnected } = useWallet()
  const { walletProfileData, updateProfileName } = useWalletInfo()
  const setUpdateProfileNftVisible = useSetRecoilState(
    updateProfileNftVisibleAtom
  )

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
            chain,
            coreAddress: daoInfo.coreAddress,
          }).selectors.depositInfo
      ),
    [chain, daoInfo.coreAddress, daoInfo.proposalModules]
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

  return isWalletConnected ? (
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
        showUpdateProfileNft={() => setUpdateProfileNftVisible(true)}
        updateProfileName={updateProfileName}
        walletProfileData={walletProfileData}
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
        showUpdateProfileNft={() => setUpdateProfileNftVisible(true)}
        updateProfileName={updateProfileName}
        walletProfileData={walletProfileData}
      />
    )
  ) : (
    <ProfileDisconnectedCard />
  )
}
