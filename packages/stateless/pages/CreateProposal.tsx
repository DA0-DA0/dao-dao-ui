import { ReactNode, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { DaoInfo, ProposalModule, ProposalModuleAdapter } from '@dao-dao/types'
import { getParentDaoBreadcrumbs } from '@dao-dao/utils'

import { Dropdown, DropdownOption, useAppLayoutContext } from '../components'

export interface CreateProposalProps {
  daoInfo: DaoInfo
  notMember: boolean
  proposalModule: ProposalModule
  setProposalModule: (proposalModule: ProposalModule) => void
  newProposal: ReactNode
  rightSidebarContent: ReactNode
  matchAdapter: (contractName: string) => ProposalModuleAdapter | undefined
}

export const CreateProposal = ({
  daoInfo,
  notMember,
  proposalModule,
  setProposalModule,
  newProposal,
  rightSidebarContent,
  matchAdapter,
}: CreateProposalProps) => {
  const { t } = useTranslation()
  const { RightSidebarContent, PageHeader } = useAppLayoutContext()

  // List of proposal modules available, using the adapter ID to derive a label
  // to display in the dropdown.
  const proposalModuleItems = useMemo(
    () =>
      daoInfo.proposalModules
        .map((proposalModule): DropdownOption<ProposalModule> | undefined => {
          const adapter = matchAdapter(proposalModule.contractName)
          return (
            adapter && {
              label: t(`proposalModuleLabel.${adapter.id}`),
              value: proposalModule,
            }
          )
        })
        .filter((item): item is DropdownOption<ProposalModule> => !!item),
    [daoInfo.proposalModules, matchAdapter, t]
  )

  return (
    <>
      <RightSidebarContent>{rightSidebarContent}</RightSidebarContent>
      <PageHeader
        breadcrumbs={{
          crumbs: [
            { href: '/home', label: 'Home' },
            ...getParentDaoBreadcrumbs(daoInfo.parentDao),
            { href: `/dao/${daoInfo.coreAddress}`, label: daoInfo.name },
          ],
          current: t('title.createProposal'),
        }}
        className="mx-auto max-w-5xl"
        rightNode={
          <Dropdown
            containerClassName="hidden lg:block"
            onSelect={setProposalModule}
            options={proposalModuleItems}
            selected={proposalModule}
          />
        }
      />

      <div className="mx-auto flex max-w-5xl flex-col items-stretch gap-6">
        {notMember && (
          <p className="caption-text text-text-interactive-error">
            {t('error.mustBeMemberToCreateProposal')}
          </p>
        )}

        <div className="flex flex-row items-center justify-between">
          <p className="title-text text-text-body">{t('title.newProposal')}</p>

          {/* Show in PageHeader on large screens. */}
          <Dropdown
            containerClassName="lg:hidden"
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
