import clsx from 'clsx'
import { ComponentType, useState } from 'react'
import { useTranslation } from 'react-i18next'

import {
  DaoWithDropdownVetoableProposalList,
  LinkWrapperProps,
} from '@dao-dao/types'

import { DaoDropdown } from '../dao'
import { DropdownIconButton } from '../icon_buttons'
import { TooltipInfoIcon } from '../tooltip'

export type VetoableProposalsProps<T extends { proposalId: string }> = {
  daoName: string
  daosWithVetoableProposals: DaoWithDropdownVetoableProposalList<T>[]
  ProposalLine: ComponentType<T>
  LinkWrapper: ComponentType<LinkWrapperProps>
  className?: string
}

export const VetoableProposals = <T extends { proposalId: string }>({
  daoName,
  daosWithVetoableProposals,
  ProposalLine,
  LinkWrapper,
  className,
}: VetoableProposalsProps<T>) => {
  const { t } = useTranslation()
  const [vetoableExpanded, setVetoableExpanded] = useState(true)

  return (
    <div className={clsx('flex flex-col gap-4', className)}>
      <div className="link-text ml-2 flex flex-row items-center gap-3 text-text-secondary">
        <DropdownIconButton
          className="text-icon-primary"
          open={vetoableExpanded}
          toggle={() => setVetoableExpanded((e) => !e)}
        />

        <p>{t('title.vetoable')}</p>

        <TooltipInfoIcon
          className="-ml-1.5"
          size="sm"
          title={t('info.vetoableProposalsTooltip', {
            daoName,
          })}
        />
      </div>

      <div
        className={clsx(
          'animate-fade-in space-y-4 pl-8',
          vetoableExpanded ? 'mb-3' : 'hidden'
        )}
      >
        {daosWithVetoableProposals.map(({ dao, proposals }) => (
          <DaoDropdown
            key={dao.chainId + dao.coreAddress}
            LinkWrapper={LinkWrapper}
            dao={dao}
            showSubDaos={false}
          >
            <div className="mt-2 space-y-1 pl-6">
              {proposals.map((props) => (
                <ProposalLine
                  {...props}
                  key={dao.chainId + dao.coreAddress + props.proposalId}
                />
              ))}
            </div>
          </DaoDropdown>
        ))}
      </div>
    </div>
  )
}
