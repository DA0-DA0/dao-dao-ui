import { useTranslation } from 'react-i18next'

import { ArrowDropdown } from '@dao-dao/icons'

import { ProposalLine, ProposalLineProps } from './ProposalLine'

export interface ProposalListProps {
  openProposals: ProposalLineProps[]
  historyProposals: ProposalLineProps[]
}

export const ProposalList = ({
  openProposals,
  historyProposals,
}: ProposalListProps) => {
  const { t } = useTranslation()

  return (
    <>
      <p className="mb-6 text-text-body title-text">{t('title.proposals')}</p>

      {!!openProposals.length && (
        <div className="mb-9 space-y-1">
          {openProposals.map((props, index) => (
            <ProposalLine {...props} key={index} />
          ))}
        </div>
      )}

      <div className="flex flex-row gap-3 items-center mt-3 ml-2 text-text-secondary link-text">
        <ArrowDropdown className="w-2 h-2" />

        <p>
          {/* eslint-disable-next-line i18next/no-literal-string */}
          {t('title.history')} •{' '}
          {t('title.numProposals', { count: historyProposals.length })}
        </p>
      </div>

      <div className="mt-6 space-y-1">
        {historyProposals.map((props, index) => (
          <ProposalLine {...props} key={index} />
        ))}
      </div>
    </>
  )
}
