import clsx from 'clsx'
import { ComponentType, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { NoProposals } from '@dao-dao/icons'

import { Button } from '../Button'
import { DropdownIconButton } from '../IconButton'
import { Loader } from '../Loader'
import { NoContent } from '../NoContent'

export interface ProposalListProps<T> {
  ProposalLine: ComponentType<T>
  openProposals: T[]
  historyProposals: T[]
  createNewProposalHref: string
  canLoadMore: boolean
  loadMore: () => void
  loadingMore: boolean
  isMember: boolean
}

export const ProposalList = <T extends {}>({
  ProposalLine,
  openProposals,
  historyProposals,
  createNewProposalHref,
  canLoadMore,
  loadMore,
  loadingMore,
  isMember,
}: ProposalListProps<T>) => {
  const { t } = useTranslation()

  const [historyExpanded, setHistoryExpanded] = useState(true)

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
        <DropdownIconButton
          className="text-icon-primary"
          open={historyExpanded}
          toggle={() => setHistoryExpanded((e) => !e)}
        />

        <p>
          {/* eslint-disable-next-line i18next/no-literal-string */}
          {t('title.history')} •{' '}
          {t('title.numProposals', { count: historyProposals.length })}
        </p>
      </div>

      <div className={clsx(!historyExpanded && 'hidden')}>
        <div className="mt-6 space-y-1">
          {historyProposals.map((props, index) => (
            <ProposalLine {...props} key={index} />
          ))}
        </div>

        {(canLoadMore || loadingMore) && (
          <div className="flex flex-row justify-end mt-4">
            <Button
              className="secondary"
              loading={loadingMore}
              onClick={loadMore}
            >
              {t('button.loadMore')}
            </Button>
          </div>
        )}
      </div>
    </div>
  ) : // If loading but no proposals are display yet, just show loader.
  loadingMore ? (
    <div className="pt-6 border-t border-border-secondary">
      <Loader fill={false} />
    </div>
  ) : (
    <NoContent
      Icon={NoProposals}
      actionNudge={t('info.createFirstOneQuestion')}
      body={t('info.noProposalsYet')}
      buttonLabel={t('button.newProposal')}
      href={isMember ? createNewProposalHref : undefined}
    />
  )
}
