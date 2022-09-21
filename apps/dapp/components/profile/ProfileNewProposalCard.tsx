// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import { useWallet } from '@noahsaso/cosmodal'
import { useRef } from 'react'
import { useTranslation } from 'react-i18next'

import { SuspenseLoader, useDaoInfoContext } from '@dao-dao/common'
import { matchAndLoadCommon } from '@dao-dao/proposal-module-adapter'
import { ProposalModule } from '@dao-dao/tstypes'
import {
  Loader,
  Logo,
  ProfileNewProposalCardInfoLine,
  ProfileNewProposalCard as StatelessProfileNewProposalCard,
} from '@dao-dao/ui'

export interface ProfileNewProposalCardProps {
  proposalModule: ProposalModule
}

export const ProfileNewProposalCard = (props: ProfileNewProposalCardProps) => {
  const { name } = useDaoInfoContext()
  const { name: walletName = '', address: walletAddress = '' } = useWallet()

  return (
    <SuspenseLoader
      fallback={
        <StatelessProfileNewProposalCard
          addresses={{ loading: true }}
          daoName={name}
          lines={{ loading: true }}
          // TODO: Retrieve.
          profileImgUrl={undefined}
          walletAddress={walletAddress}
          // TODO: Retrieve.
          walletName={walletName}
        />
      }
    >
      <InnerProfileNewProposalCard {...props} />
    </SuspenseLoader>
  )
}

export const InnerProfileNewProposalCard = ({
  proposalModule,
}: ProfileNewProposalCardProps) => {
  const { t } = useTranslation()
  const { name, coreAddress, proposalModules } = useDaoInfoContext()
  const { name: walletName = '', address: walletAddress = '' } = useWallet()

  const allProposalModuleCommons = useRef(
    proposalModules.map((proposalModule) => ({
      common: matchAndLoadCommon(proposalModule, {
        coreAddress,
        Loader,
        Logo,
      }),
      proposalModule,
    }))
  ).current

  let lines: ProfileNewProposalCardInfoLine[] | undefined
  allProposalModuleCommons.forEach(
    ({
      proposalModule: { address },
      common: {
        hooks: { useProfileNewProposalCardInfoLines },
      },
    }) => {
      // Safe because hooks are always called in same order.
      // `allProposalModuleCommons` does not change.

      // eslint-disable-next-line react-hooks/rules-of-hooks
      const _lines = useProfileNewProposalCardInfoLines()
      if (address === proposalModule.address) {
        lines = _lines
      }
    }
  )

  if (!lines) {
    throw new Error(t('error.loadingData'))
  }

  return (
    <StatelessProfileNewProposalCard
      // TODO: Add to voting module adapter.
      addresses={{ loading: false, data: [] }}
      daoName={name}
      lines={{ loading: false, data: lines }}
      // TODO: Retrieve.
      profileImgUrl={undefined}
      walletAddress={walletAddress}
      // TODO: Retrieve.
      walletName={walletName}
    />
  )
}
