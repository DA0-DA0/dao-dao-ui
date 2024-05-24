import clsx from 'clsx'
import { ComponentType } from 'react'
import { useTranslation } from 'react-i18next'

import { DaoProposalSearchResult } from '@dao-dao/state/indexer'
import {
  DaoCardInfo,
  LinkWrapperProps,
  StatefulLazyProposalLineProps,
} from '@dao-dao/types'
import { UNDO_PAGE_PADDING_HORIZONTAL_CLASSES } from '@dao-dao/utils'

import {
  HorizontalScroller,
  HorizontalScrollerProps,
  ProposalList,
} from '../components'

export type HomeProps = {
  featuredDaosProps: Pick<
    HorizontalScrollerProps<DaoCardInfo>,
    'Component' | 'items'
  >
  recentProposals: DaoProposalSearchResult[]
  LazyProposalLine: ComponentType<StatefulLazyProposalLineProps>
  LinkWrapper: ComponentType<LinkWrapperProps>
}

export const Home = ({
  featuredDaosProps,
  recentProposals,
  LazyProposalLine,
  LinkWrapper,
}: HomeProps) => {
  const { t } = useTranslation()

  return (
    <>
      <div className="flex flex-col items-center gap-4">
        <p className="title-text self-start text-lg">
          {t('title.featuredDaos')}
        </p>

        {/* Featured DAOs container */}
        <HorizontalScroller
          {...featuredDaosProps}
          // Margin offsets container padding.
          containerClassName={clsx(
            'self-stretch px-[1px]',
            (featuredDaosProps.items.loading ||
              featuredDaosProps.items.data.length > 0) &&
              UNDO_PAGE_PADDING_HORIZONTAL_CLASSES
          )}
          itemClassName="w-64"
          // Max width of 5xl = 64rem, container padding of 6 = 1.5rem
          shadowClassName="w-[max((100%-64rem)/2,1.5rem)]"
        />
      </div>

      <ProposalList<StatefulLazyProposalLineProps>
        LinkWrapper={LinkWrapper}
        ProposalLine={LazyProposalLine}
        canLoadMore={false}
        className="w-full mt-8"
        daoName=""
        daosWithVetoableProposals={[]}
        isMember={false}
        loadMore={() => {}}
        loadingMore={false}
        openProposals={recentProposals.flatMap(
          ({ chainId, value: { dao, daoProposalId } }) =>
            dao && daoProposalId
              ? {
                  chainId,
                  coreAddress: dao,
                  proposalId: daoProposalId,
                  isPreProposeProposal: false,
                }
              : []
        )}
        sections={[]}
      />
    </>
  )
}
