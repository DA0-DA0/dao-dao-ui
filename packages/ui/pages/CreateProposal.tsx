import { ReactNode, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { DaoInfo } from '@dao-dao/common'
import { ProposalModule } from '@dao-dao/utils'

import { Dropdown, PageHeader } from '../components'
export interface CreateProposalProps {
  daoInfo: DaoInfo
  isMember: boolean
  proposalModule: ProposalModule
  setProposalModule: (proposalModule: ProposalModule) => void
  newProposal: ReactNode
}

export const CreateProposal = ({
  daoInfo,
  isMember,
  proposalModule,
  setProposalModule,
  newProposal,
}: CreateProposalProps) => {
  const { t } = useTranslation()

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
    <div className="flex flex-col gap-6 items-stretch px-6 mx-auto max-w-5xl">
      <PageHeader
        breadcrumbs={{
          crumbs: [
            { href: '/home', label: 'Home' },
            { href: `/dao/${daoInfo.coreAddress}`, label: daoInfo.name },
          ],
          current: t('title.newProposal'),
        }}
      >
        <Dropdown
          onSelect={setProposalModule}
          options={proposalModuleItems}
          selected={proposalModule}
        />
      </PageHeader>

      {!isMember && (
        <p className="text-text-error caption-text">
          {t('error.mustBeMemberToCreateProposal')}
        </p>
      )}

      <p className="text-text-body title-text">{t('title.newProposal')}</p>

      {newProposal}
    </div>
  )
}
