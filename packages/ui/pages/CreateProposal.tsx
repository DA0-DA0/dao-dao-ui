import { ReactNode, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { DaoInfo } from '@dao-dao/common'
import { ProposalModule } from '@dao-dao/tstypes'

import { Dropdown, PageHeader, useAppLayoutContext } from '../components'

export interface CreateProposalProps {
  daoInfo: DaoInfo
  isMember: boolean
  proposalModule: ProposalModule
  setProposalModule: (proposalModule: ProposalModule) => void
  newProposal: ReactNode
  rightSidebarContent: ReactNode
}

export const CreateProposal = ({
  daoInfo,
  isMember,
  proposalModule,
  setProposalModule,
  newProposal,
  rightSidebarContent,
}: CreateProposalProps) => {
  const { t } = useTranslation()
  const { RightSidebarContent } = useAppLayoutContext()

  const proposalModuleItems = useMemo(
    () =>
      daoInfo.proposalModules.map((proposalModule) => ({
        label: t(
          `proposalModuleLabel.${
            proposalModule.contractName.split(':').slice(-1)[0]
          }`
        ),
        value: proposalModule,
      })),
    [daoInfo.proposalModules, t]
  )

  return (
    <>
      <RightSidebarContent>{rightSidebarContent}</RightSidebarContent>

      <div className="flex flex-col gap-6 items-stretch px-6 mx-auto max-w-5xl">
        <PageHeader
          breadcrumbs={{
            crumbs: [
              { href: '/home', label: 'Home' },
              { href: `/dao/${daoInfo.coreAddress}`, label: daoInfo.name },
            ],
            current: t('title.createProposal'),
          }}
          rightNode={
            <Dropdown
              containerClassName="hidden sm:block"
              onSelect={setProposalModule}
              options={proposalModuleItems}
              selected={proposalModule}
            />
          }
        />

        {!isMember && (
          <p className="text-text-interactive-error caption-text">
            {t('error.mustBeMemberToCreateProposal')}
          </p>
        )}

        <div className="flex flex-row justify-between items-center">
          <p className="text-text-body title-text">{t('title.newProposal')}</p>

          {/* Show in PageHeader on large screens. */}
          <Dropdown
            containerClassName="sm:hidden"
            onSelect={setProposalModule}
            options={proposalModuleItems}
            selected={proposalModule}
          />
        </div>

        {newProposal}
      </div>
    </>
  )
}
