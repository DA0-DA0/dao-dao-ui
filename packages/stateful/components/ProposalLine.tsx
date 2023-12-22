import { useTranslation } from 'react-i18next'

import {
  ChainProvider,
  ProposalLineLoader,
  WarningCard,
} from '@dao-dao/stateless'
import { StatefulProposalLineProps } from '@dao-dao/types'

import {
  ProposalModuleAdapterProvider,
  useProposalModuleAdapter,
} from '../proposal-module-adapter'
import { LinkWrapper } from './LinkWrapper'
import { SuspenseLoader } from './SuspenseLoader'

export const ProposalLine = ({
  chainId,
  coreAddress,
  proposalModules,
  proposalId,
  ...props
}: StatefulProposalLineProps) => (
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
  StatefulProposalLineProps,
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
