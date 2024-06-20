import { useTranslation } from 'react-i18next'

import { LineLoader, StatusCard } from '@dao-dao/stateless'
import { StatefulProposalLineProps } from '@dao-dao/types'

import {
  ProposalModuleAdapterProvider,
  useProposalModuleAdapter,
} from '../proposal-module-adapter'
import { DaoProviders } from './dao'
import { LinkWrapper } from './LinkWrapper'
import { SuspenseLoader } from './SuspenseLoader'

export const ProposalLine = ({
  chainId,
  coreAddress,
  proposalId,
  ...props
}: StatefulProposalLineProps) => (
  <DaoProviders
    chainId={chainId}
    coreAddress={coreAddress}
    loaderFallback={<LineLoader type="proposal" />}
  >
    <ProposalModuleAdapterProvider proposalId={proposalId}>
      <InnerProposalLine {...props} />
    </ProposalModuleAdapterProvider>
  </DaoProviders>
)

type InnerProposalLineProps = Pick<
  StatefulProposalLineProps,
  'proposalViewUrl' | 'isPreProposeProposal' | 'onClick'
>

const InnerProposalLine = ({
  proposalViewUrl,
  onClick,
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
    return (
      <StatusCard
        content={t('error.unsupportedApprovalFailedRender')}
        style="warning"
      />
    )
  }

  return (
    <SuspenseLoader fallback={<LineLoader type="proposal" />}>
      <Component
        LinkWrapper={LinkWrapper}
        href={proposalViewUrl}
        onClick={onClick}
      />
    </SuspenseLoader>
  )
}
