import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { ProposalModule } from '@dao-dao/utils'

import {
  DaoDropdown,
  DaoDropdownInfo,
  DropdownOption,
  ProposalContainer,
  ProposalLine,
  ProposalStatusEnum,
} from '../components'
import { SortFn, useDropdownSorter } from '../hooks'

export interface ProposalInfo {
  id: string
  status: ProposalStatusEnum
  title: string
  secondsRemaining: number
  created: Date
}

export interface DaoWithProposals {
  dao: DaoDropdownInfo
  proposals: ProposalInfo[]
}

export interface InboxProps {
  daosWithProposals: DaoWithProposals[]
  proposalModules: ProposalModule[]
}

export const Inbox = ({ daosWithProposals, proposalModules }: InboxProps) => {
  const { t } = useTranslation()

  const { sortedData: sortedDaosWithProposals, Dropdown } = useDropdownSorter(
    daosWithProposals,
    sortOptions[0].value
  )

  const numOpenProposals = useMemo(
    () =>
      daosWithProposals.reduce(
        (acc, { proposals }) => acc + proposals.length,
        0
      ),
    [daosWithProposals]
  )

  return (
    <div className="flex flex-col items-stretch">
      <p className="mx-24 h-20 leading-[5rem] border-b border-border-secondary header-text">
        {t('title.inbox')}
      </p>

      <div className="flex flex-row justify-between mx-24 mt-10">
        <p className="title-text">
          {t('title.numOpenProposals', { count: numOpenProposals })}
        </p>

        <div className="flex flex-row gap-6 justify-between items-center">
          <p className="text-text-body primary-text">{t('title.sortBy')}</p>

          <Dropdown options={sortOptions} />
        </div>
      </div>

      <div className="mx-24 mt-6 space-y-3">
        {sortedDaosWithProposals.map(({ dao, proposals }, index) => (
          <DaoDropdown
            key={index}
            dao={{
              ...dao,
              content: (
                <ProposalContainer className="mt-4">
                  {proposals.map((proposal) => (
                    // TODO: Replace with stateless version.
                    <ProposalLine
                      key={proposal.id}
                      coreAddress="junoabc123"
                      proposalId={proposal.id}
                      proposalModules={proposalModules}
                      proposalViewUrl="#"
                    />
                  ))}
                </ProposalContainer>
              ),
            }}
            defaultExpanded
            showSubdaos={false}
          />
        ))}
      </div>
    </div>
  )
}

const sortOptions: DropdownOption<SortFn<DaoWithProposals>>[] = [
  {
    label: 'Expiry',
    value: (a, b) =>
      Math.min(
        Infinity,
        ...a.proposals.map(({ secondsRemaining }) => secondsRemaining)
      ) -
      Math.min(
        Infinity,
        ...b.proposals.map(({ secondsRemaining }) => secondsRemaining)
      ),
  },
  {
    label: 'Newest',
    value: (a, b) =>
      Math.min(...b.proposals.map(({ created }) => created.getTime())) -
      Math.min(...a.proposals.map(({ created }) => created.getTime())),
  },
  {
    label: 'Oldest',
    value: (a, b) =>
      Math.min(...a.proposals.map(({ created }) => created.getTime())) -
      Math.min(...b.proposals.map(({ created }) => created.getTime())),
  },
]
