// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import { useTranslation } from 'react-i18next'

import { SuspenseLoader, useWalletProfile } from '@dao-dao/stateful'
import { matchAndLoadCommon } from '@dao-dao/stateful/proposal-module-adapter'
import { useVotingModuleAdapter } from '@dao-dao/stateful/voting-module-adapter'
import {
  ProfileNewProposalCard as StatelessProfileNewProposalCard,
  useAppLayoutContext,
  useDaoInfoContext,
} from '@dao-dao/stateless'

export interface ProfileNewProposalCardProps {
  proposalModuleAdapterCommon: ReturnType<typeof matchAndLoadCommon>
}

export const ProfileNewProposalCard = (props: ProfileNewProposalCardProps) => {
  const { name: daoName, coreAddress } = useDaoInfoContext()
  const { walletProfile, updateProfileName } = useWalletProfile()
  const { updateProfileNft } = useAppLayoutContext()

  return (
    <SuspenseLoader
      fallback={
        <StatelessProfileNewProposalCard
          daoName={daoName}
          info={{ loading: true }}
          showUpdateProfileNft={updateProfileNft.toggle}
          updateProfileName={updateProfileName}
          walletProfile={walletProfile}
        />
      }
    >
      {/* Use `key` prop to fully re-instantiate this card when the proposalModule changes since we use hooks from the proposal module, and different proposal modules have different internal hooks. */}
      <InnerProfileNewProposalCard
        key={`${coreAddress}:${props.proposalModuleAdapterCommon.id}`}
        {...props}
      />
    </SuspenseLoader>
  )
}

export const InnerProfileNewProposalCard = ({
  proposalModuleAdapterCommon: {
    hooks: { useProfileNewProposalCardInfoLines },
  },
}: ProfileNewProposalCardProps) => {
  const { t } = useTranslation()
  const { name: daoName, coreAddress } = useDaoInfoContext()
  const { walletProfile, updateProfileName } = useWalletProfile()
  const { updateProfileNft } = useAppLayoutContext()
  const {
    hooks: { useProfileNewProposalCardAddresses },
  } = useVotingModuleAdapter()

  const lines = useProfileNewProposalCardInfoLines()
  const addresses = useProfileNewProposalCardAddresses()

  return (
    <StatelessProfileNewProposalCard
      daoName={daoName}
      info={{
        loading: false,
        data: {
          lines,
          addresses: [
            {
              label: t('title.daoTreasury'),
              address: coreAddress,
            },
            ...addresses,
          ],
        },
      }}
      showUpdateProfileNft={updateProfileNft.toggle}
      updateProfileName={updateProfileName}
      walletProfile={walletProfile}
    />
  )
}
