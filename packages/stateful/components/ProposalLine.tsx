import { useTranslation } from 'react-i18next'

import {
  ChainProvider,
  ProposalLineLoader,
  WarningCard,
} from '@dao-dao/stateless'
import { ProposalModule } from '@dao-dao/types'

import {
  ProposalModuleAdapterProvider,
  useProposalModuleAdapter,
} from '../proposal-module-adapter'
import { LinkWrapper } from './LinkWrapper'
import { SuspenseLoader } from './SuspenseLoader'

export interface ProposalLineProps {
  // This may be shown in the inbox, outside of the context of a DAO or chain.
  chainId: string
  coreAddress: string
  proposalModules: ProposalModule[]
  proposalId: string
  proposalViewUrl: string
  isPreProposeProposal: boolean
}

export const ProposalLine = ({
  chainId,
  coreAddress,
  proposalModules,
  proposalId,
  ...props
}: ProposalLineProps) => (
  <ChainProvider chainId={chainId}>
    <ProposalModuleAdapterProvider
      initialOptions={{
        coreAddress,
      }}
      proposalId={proposalId}
      proposalModules={proposalModules}
    >
      <InnerProposalLine {...props} />
    </ProposalModuleAdapterProvider>
  </ChainProvider>
)

type InnerProposalLineProps = Pick<
  ProposalLineProps,
  'proposalViewUrl' | 'isPreProposeProposal'
>

const InnerProposalLine = ({
  proposalViewUrl,
  isPreProposeProposal,
}: InnerProposalLineProps) => {
  const { t } = useTranslation()
  const {
    components: { ProposalLine, PreProposeApprovalProposalLine },
  } = useProposalModuleAdapter()

  const Component = isPreProposeProposal
    ? PreProposeApprovalProposalLine
    : ProposalLine
  if (!Component) {
    return <WarningCard content={t('error.unsupportedApprovalFailedRender')} />
  }

  return (
    <SuspenseLoader fallback={<ProposalLineLoader />}>
      <Component LinkWrapper={LinkWrapper} href={proposalViewUrl} />
    </SuspenseLoader>
  )
}
