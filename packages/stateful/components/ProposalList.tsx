import { useEffect, useMemo, useState } from 'react'
import { useRecoilCallback } from 'recoil'

import {
  ProposalList as StatelessProposalList,
  useDaoInfoContext,
} from '@dao-dao/stateless'

import { useMembership } from '../hooks'
import { matchAndLoadCommon } from '../proposal-module-adapter'
import { ProposalLine, ProposalLineProps } from './ProposalLine'

// Contracts enforce a max of 30, though this is on the edge for DAOs with
// proposals that have a large size.
const PROP_LOAD_LIMIT = 20

export const ProposalList = () => {
  const { chainId, coreAddress, proposalModules } = useDaoInfoContext()
  const { isMember = false } = useMembership({
    coreAddress,
    chainId,
  })

  const [openProposals, setOpenProposals] = useState<ProposalLineProps[]>([])
  const [historyProposals, setHistoryProposals] = useState<ProposalLineProps[]>(
    []
  )

  // Get selectors for all proposal modules to list proposals.
  const reverseProposalInfosSelectors = useMemo(
    () =>
      proposalModules.map((proposalModule) => ({
        reverseProposalInfos: matchAndLoadCommon(proposalModule, {
          chainId,
          coreAddress,
        }).selectors.reverseProposalInfos,
        proposalModule,
      })),
    [chainId, coreAddress, proposalModules]
  )

  // Cursor values for each proposal module for incremental queries.
  const [startBefores, setStartBefores] = useState<
    Record<string, number | undefined>
  >({})

  const [loading, setLoading] = useState(true)
  const [canLoadMore, setCanLoadMore] = useState(true)
  const loadMore = useRecoilCallback(
    ({ snapshot }) =>
      async () => {
        setLoading(true)
        try {
          const proposalListInfos = await Promise.all(
            reverseProposalInfosSelectors.map(
              async ({ proposalModule, reverseProposalInfos }) => {
                const startBefore = startBefores[proposalModule.address]

                const proposalInfos = await snapshot.getPromise(
                  reverseProposalInfos({
                    startBefore,
                    limit: PROP_LOAD_LIMIT,
                  })
                )

                return proposalInfos.map((info) => ({
                  ...info,
                  proposalModule,
                }))
              }
            )
          )

          // Sort descending by timestamp, putting undefined timestamps at the bottom.
          const newProposalInfos = proposalListInfos
            .flat()
            .sort((a, b) =>
              b.timestamp && a.timestamp
                ? b.timestamp.getTime() - a.timestamp.getTime()
                : !a.timestamp
                ? 1
                : !b.timestamp
                ? -1
                : 0
            )
            // We can only guarantee that the first PROP_LOAD_LIMIT proposals in
            // this list of proposals combined from all proposal modules are in
            // order, since we loaded the most recent PROP_LOAD_LIMIT proposals
            // from each module, and then sorted all of them against each other.
            // If we display all proposals returned (e.g. 10 from A, 10 from B,
            // etc.), it's possible we'll include proposals from module B that
            // are temporally after not-yet-loaded proposals from module A. In
            // other words, if A has 12 proposals, B has 5 proposals, all of A's
            // proposals are more recent than B's, and we load the first 10 from
            // both, we cannot show the first 10 from A followed by all 5 from
            // B, because we do not yet know if A has another page of 10 that
            // are before B's 5. Thus, we ask all modules for 10, and only show
            // the most recent 10, until the next list loads the remaining 2
            // from A followed by the 5 from B (since A is out of proposals). In
            // summary, we must display at most the number of proposals that we
            // ask for from each module to preserve the relative timestamps
            // across all modules.
            .slice(0, PROP_LOAD_LIMIT)

          // Store startBefore cursor values for next query based on last
          // proposal ID in list from each proposal module.
          setStartBefores((prev) =>
            proposalModules.reduce(
              (acc, proposalModule) => ({
                ...acc,
                [proposalModule.address]:
                  newProposalInfos
                    .filter((info) => info.proposalModule === proposalModule)
                    .slice(-1)[0]?.proposalNumber ??
                  // If no proposal from this proposal module shows up in the
                  // proposals we are listing here, use the startBefore from before.
                  prev[proposalModule.address],
              }),
              {} as Record<string, number | undefined>
            )
          )

          // If we loaded the max we asked for, there may be more in another
          // query.
          setCanLoadMore(newProposalInfos.length === PROP_LOAD_LIMIT)

          const transformIntoProps = ({
            id,
          }: typeof newProposalInfos[number]): ProposalLineProps => ({
            chainId,
            coreAddress,
            proposalModules,
            proposalId: id,
            proposalViewUrl: `/dao/${coreAddress}/proposals/${id}`,
          })

          setOpenProposals((proposals) => [
            ...proposals,
            ...newProposalInfos
              .filter(({ isOpen }) => isOpen)
              .map(transformIntoProps),
          ])
          setHistoryProposals((proposals) => [
            ...proposals,
            ...newProposalInfos
              .filter(({ isOpen }) => !isOpen)
              .map(transformIntoProps),
          ])
        } finally {
          setLoading(false)
        }
      },
    [reverseProposalInfosSelectors, startBefores, proposalModules, coreAddress]
  )
  // Load once on mount.
  useEffect(() => {
    loadMore()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <StatelessProposalList
      ProposalLine={ProposalLine}
      canLoadMore={canLoadMore}
      createNewProposalHref={`/dao/${coreAddress}/proposals/create`}
      historyProposals={historyProposals}
      isMember={isMember}
      loadMore={loadMore}
      loadingMore={loading}
      openProposals={openProposals}
    />
  )
}
