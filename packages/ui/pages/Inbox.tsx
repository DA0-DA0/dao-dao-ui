import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { ProposalModule } from '@dao-dao/utils'

import {
  DaoDropdown,
  DaoDropdownInfo,
  DropdownOption,
  ProposalContainer,
  ProposalLine,
  ProposalLineProps,
} from '../components'
import { SortFn, useDropdownSorter } from '../hooks'

export interface ProposalInfo {
  secondsRemaining: number
  created: Date
  props: ProposalLineProps
}

export interface DaoWithProposals {
  dao: DaoDropdownInfo
  proposals: ProposalInfo[]
}

export interface InboxProps {
  daosWithProposals: DaoWithProposals[]
  proposalModules: ProposalModule[]
}

export const Inbox = ({ daosWithProposals }: InboxProps) => {
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
                  {proposals.map(({ props }, index) => (
                    <ProposalLine key={index} {...props} />
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
