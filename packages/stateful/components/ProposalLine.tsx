import { useTranslation } from 'react-i18next'

import {
  LineLoader,
  StatusCard,
  useDaoContextIfAvailable,
} from '@dao-dao/stateless'
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
}: StatefulProposalLineProps) => {
  const existingDao = useDaoContextIfAvailable()?.dao

  const content = (
    <ProposalModuleAdapterProvider proposalId={proposalId}>
      <InnerProposalLine {...props} />
    </ProposalModuleAdapterProvider>
  )

  // If already in this DAO's context, no need to wrap in another provider.
  if (
    existingDao &&
    existingDao.chainId === chainId &&
    existingDao.coreAddress === coreAddress
  ) {
    return content
  }

  return (
    <DaoProviders
      chainId={chainId}
      coreAddress={coreAddress}
      loaderFallback={<LineLoader type="proposal" />}
    >
      {content}
    </DaoProviders>
  )
}

type InnerProposalLineProps = Pick<
  StatefulProposalLineProps,
  'proposalViewUrl' | 'isPreProposeProposal' | 'onClick' | 'openInNewTab'
>

const InnerProposalLine = ({
  proposalViewUrl,
  onClick,
  isPreProposeProposal,
  openInNewTab,
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
        openInNewTab={openInNewTab}
      />
    </SuspenseLoader>
  )
}
