import { useTranslation } from 'react-i18next'

import { ArrowDropdown, NoProposals } from '@dao-dao/icons'

import { Button } from '../Button'
import { ProposalLine, ProposalLineProps } from './ProposalLine'

export interface ProposalListProps {
  openProposals: ProposalLineProps[]
  historyProposals: ProposalLineProps[]
  createNewProposal: () => void
}

export const ProposalList = ({
  openProposals,
  historyProposals,
  createNewProposal,
}: ProposalListProps) => {
  const { t } = useTranslation()

  return openProposals.length > 0 || historyProposals.length > 0 ? (
    <div className="pt-6 border-t border-border-secondary">
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
    </div>
  ) : (
    <div
      className="flex flex-col gap-5 items-center py-10 rounded-md border-2 border-border-primary hover:border-border-interactive-hover border-dashed hover:border-solid transition-all cursor-pointer"
      onClick={createNewProposal}
    >
      <NoProposals className="!w-14 !h-14 text-icon-tertiary" />

      <p className="text-center text-text-tertiary secondary-text">
        {t('info.noProposalYet')}
        <br />
        {t('info.createFirstOneQuestion')}
      </p>

      <Button onClick={createNewProposal} variant="secondary">
        {t('button.newProposal')}
      </Button>
    </div>
  )
}
