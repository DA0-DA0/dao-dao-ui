import { HowToVoteRounded } from '@mui/icons-material'
import clsx from 'clsx'
import { ComponentType, useState } from 'react'
import { useTranslation } from 'react-i18next'

import {
  DaoWithDropdownVetoableProposalList,
  LinkWrapperProps,
} from '@dao-dao/types'

import { useDaoInfoContext } from '../../hooks'
import { Button } from '../buttons'
import { DaoDropdown } from '../dao'
import { DropdownIconButton } from '../icon_buttons'
import { Loader } from '../logo/Loader'
import { NoContent } from '../NoContent'
import { TooltipInfoIcon } from '../tooltip'

export interface ProposalListProps<T extends { proposalId: string }> {
  ProposalLine: ComponentType<T>
  openProposals: T[]
  // DAOs with proposals that can be vetoed.
  daosWithVetoableProposals: DaoWithDropdownVetoableProposalList<T>[]
  historyProposals: T[]
  // Override array length as count.
  historyCount?: number
  createNewProposalHref: string
  canLoadMore: boolean
  loadMore: () => void
  loadingMore: boolean
  isMember: boolean
  DiscordNotifierConfigureModal: ComponentType | undefined
  LinkWrapper: ComponentType<LinkWrapperProps>
}

export const ProposalList = <T extends { proposalId: string }>({
  ProposalLine,
  openProposals,
  daosWithVetoableProposals,
  historyProposals,
  historyCount,
  createNewProposalHref,
  canLoadMore,
  loadMore,
  loadingMore,
  isMember,
  DiscordNotifierConfigureModal,
  LinkWrapper,
}: ProposalListProps<T>) => {
  const { t } = useTranslation()
  const { name: daoName } = useDaoInfoContext()

  const [vetoableExpanded, setVetoableExpanded] = useState(true)
  const [historyExpanded, setHistoryExpanded] = useState(true)

  return openProposals.length > 0 || historyProposals.length > 0 ? (
    <div className="border-t border-border-secondary py-6">
      <div className="mb-6 flex flex-row items-center justify-between gap-6">
        <p className="title-text text-text-body">{t('title.proposals')}</p>

        {DiscordNotifierConfigureModal && <DiscordNotifierConfigureModal />}
      </div>

      {openProposals.length > 0 && (
        <div className="mb-9 space-y-1">
          {openProposals.map((props) => (
            <ProposalLine {...props} key={props.proposalId} />
          ))}
        </div>
      )}

      {daosWithVetoableProposals.length > 0 && (
        <div className="mt-3 mb-6 flex animate-fade-in flex-col gap-4">
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
                showSubdaos={false}
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
      )}

      <div className="link-text mt-3 ml-2 flex flex-row items-center gap-3 text-text-secondary">
        <DropdownIconButton
          className="text-icon-primary"
          open={historyExpanded}
          toggle={() => setHistoryExpanded((e) => !e)}
        />

        <p>
          {/* eslint-disable-next-line i18next/no-literal-string */}
          {t('title.history')} •{' '}
          {t('title.numProposals', {
            count: historyCount ?? historyProposals.length,
          })}
        </p>
      </div>

      <div className={clsx('animate-fade-in', !historyExpanded && 'hidden')}>
        <div className="mt-6 space-y-1">
          {historyProposals.map((props) => (
            <ProposalLine {...props} key={props.proposalId} />
          ))}
        </div>

        {(canLoadMore || loadingMore) && (
          <div className="mt-4 flex flex-row justify-end">
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
  ) : // If loading but no proposals are loaded yet, just show loader.
  loadingMore ? (
    <div className="border-t border-border-secondary pt-6">
      <Loader fill={false} />
    </div>
  ) : (
    <NoContent
      Icon={HowToVoteRounded}
      actionNudge={t('info.createFirstOneQuestion')}
      body={t('info.noProposalsYet')}
      buttonLabel={t('button.newProposal')}
      href={isMember ? createNewProposalHref : undefined}
    />
  )
}
