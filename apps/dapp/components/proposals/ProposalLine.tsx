import Link from 'next/link'

import {
  ProposalModuleAdapterProvider,
  useProposalModuleAdapter,
} from '@dao-dao/proposal-module-adapter'
import { Loader, Logo, ProposalLineLoader, SuspenseLoader } from '@dao-dao/ui'

import { useDAOInfoContext } from '../DAOPageWrapper'

export interface ProposalLineProps {
  proposalViewUrl: string
  proposalId: string
}

export const ProposalLine = ({
  proposalId,
  proposalViewUrl,
}: ProposalLineProps) => {
  const { coreAddress, proposalModules } = useDAOInfoContext()

  return (
    <ProposalModuleAdapterProvider
      ProviderLoader={ProposalLineLoader}
      initialOptions={{
        coreAddress,
        Logo,
        Loader,
      }}
      proposalId={proposalId}
      proposalModules={proposalModules}
    >
      <Link href={proposalViewUrl}>
        <a>
          <InnerProposalLine />
        </a>
      </Link>
    </ProposalModuleAdapterProvider>
  )
}

const InnerProposalLine = () => {
  const {
    components: { ProposalLine },
  } = useProposalModuleAdapter()

  return (
    <SuspenseLoader fallback={<ProposalLineLoader />}>
      <ProposalLine.Desktop className="hidden md:grid" />
      <ProposalLine.Mobile className="block md:hidden" />
    </SuspenseLoader>
  )
}
