import { useTranslation } from 'react-i18next'

import { Loader, TooltipInfoIcon, useDao } from '@dao-dao/stateless'
import { PreProposeModuleType } from '@dao-dao/types'

import { ProposalModuleAdapterCommonProvider } from '../../proposal-module-adapter'
import { useProposalModuleAdapterCommonContext } from '../../proposal-module-adapter/react/context'
import { EntityDisplay } from '../EntityDisplay'
import { SuspenseLoader } from '../SuspenseLoader'
import { Trans } from '../Trans'
import { ProposalDaoInfoCards } from './ProposalDaoInfoCards'

export const ProposalDaoInfoCardSections = () => {
  const dao = useDao()

  return (
    <>
      {dao.proposalModules.map((proposalModule) => (
        <SuspenseLoader key={proposalModule.address} fallback={<Loader />}>
          <ProposalModuleAdapterCommonProvider
            proposalModuleAddress={proposalModule.address}
          >
            <ProposalDaoInfoCardsSection />
          </ProposalModuleAdapterCommonProvider>
        </SuspenseLoader>
      ))}
    </>
  )
}

const ProposalDaoInfoCardsSection = () => {
  const { t } = useTranslation()
  const {
    id,
    options: { proposalModule },
  } = useProposalModuleAdapterCommonContext()

  const approvee =
    proposalModule.prePropose?.type === PreProposeModuleType.Approver
      ? proposalModule.prePropose.config.approvalDao
      : undefined

  return (
    <>
      <div className="mt-4 flex flex-row items-center gap-1">
        <Trans
          context={approvee ? 'approval' : undefined}
          i18nKey={`proposalModuleInfoCardsTitle.${id}`}
        >
          <p className="title-text">Proposal module config</p>
          {approvee && (
            <EntityDisplay
              address={approvee}
              hideImage
              noCopy
              size="custom"
              textClassName="title-text"
            />
          )}
        </Trans>

        <TooltipInfoIcon
          size="xs"
          title={t('info.proposalModuleInfoCardsTooltip', {
            context: approvee ? 'approval' : undefined,
            type: t(`proposalModuleLabel.${id}`),
          })}
        />
      </div>

      <ProposalDaoInfoCards />
    </>
  )
}
