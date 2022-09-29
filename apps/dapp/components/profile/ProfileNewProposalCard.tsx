// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import { useWallet } from '@noahsaso/cosmodal'

import { SuspenseLoader, useDaoInfoContext } from '@dao-dao/common'
import { matchAndLoadCommon } from '@dao-dao/proposal-module-adapter'
import { ProfileNewProposalCard as StatelessProfileNewProposalCard } from '@dao-dao/ui'
import { useVotingModuleAdapter } from '@dao-dao/voting-module-adapter'

export interface ProfileNewProposalCardProps {
  proposalModuleAdapterCommon: ReturnType<typeof matchAndLoadCommon>
}

export const ProfileNewProposalCard = (props: ProfileNewProposalCardProps) => {
  const { name: daoName } = useDaoInfoContext()
  const { name: walletName = '', address: walletAddress = '' } = useWallet()

  return (
    <SuspenseLoader
      fallback={
        <StatelessProfileNewProposalCard
          daoName={daoName}
          info={{ loading: true }}
          // TODO: Retrieve.
          profileImgUrl={undefined}
          walletAddress={walletAddress}
          // TODO: Retrieve.
          walletName={walletName}
        />
      }
    >
      {/* Use `key` prop to fully re-instantiate this card when the proposalModule changes since we use hooks from the proposal module that may have different internal hooks. */}
      <InnerProfileNewProposalCard
        key={props.proposalModuleAdapterCommon.id}
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
  const { name: daoName } = useDaoInfoContext()
  const { name: walletName = '', address: walletAddress = '' } = useWallet()
  const {
    hooks: { useProfileNewProposalCardAddresses },
  } = useVotingModuleAdapter()

  const lines = useProfileNewProposalCardInfoLines()
  const addresses = useProfileNewProposalCardAddresses()

  return (
    <StatelessProfileNewProposalCard
      daoName={daoName}
      info={{ loading: false, data: { lines, addresses } }}
      // TODO: Retrieve.
      profileImgUrl={undefined}
      walletAddress={walletAddress}
      // TODO: Retrieve.
      walletName={walletName}
    />
  )
}
