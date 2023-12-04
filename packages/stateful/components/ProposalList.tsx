import { useEffect, useMemo, useState } from 'react'
import { useRecoilCallback, useSetRecoilState } from 'recoil'

import { refreshProposalsIdAtom } from '@dao-dao/state/recoil'
import {
  ProposalList as StatelessProposalList,
  useCachedLoadingWithError,
  useChain,
  useDaoInfoContext,
  useDaoNavHelpers,
} from '@dao-dao/stateless'
import {
  CommonProposalListInfo,
  StatefulProposalLineProps,
} from '@dao-dao/types'

import { useMembership, useOnDaoWebSocketMessage } from '../hooks'
import { matchAndLoadCommon } from '../proposal-module-adapter'
import { daoVetoableProposalsSelector } from '../recoil'
import { DiscordNotifierConfigureModal } from './dao/DiscordNotifierConfigureModal'
import { ProposalLine } from './ProposalLine'

// Contracts enforce a max of 30, though this is on the edge, so use 20.
const PROP_PAGINATE_LIMIT = 20
// Load proposals until at least this many are loaded.
const MIN_LOAD_PROPS = 100

enum ProposalType {
  Normal = 'normal',
  PreProposePending = 'preProposePending',
  PreProposeCompleted = 'preProposeCompleted',
}
const PROPOSAL_TYPES = Object.values(ProposalType)

type CommonProposalListInfoWithType = CommonProposalListInfo & {
  type: ProposalType
}

export const ProposalList = () => {
  const chain = useChain()
  const { coreAddress, proposalModules } = useDaoInfoContext()
  const { getDaoProposalPath } = useDaoNavHelpers()
  const { isMember = false } = useMembership({
    coreAddress,
  })

  const [openProposals, setOpenProposals] = useState<
    StatefulProposalLineProps[]
  >([])
  const [historyProposals, setHistoryProposals] = useState<
    StatefulProposalLineProps[]
  >([])

  // Get selectors for all proposal modules so we can list proposals.
  const commonSelectors = useMemo(
    () =>
      proposalModules.map((proposalModule) => ({
        selectors: matchAndLoadCommon(proposalModule, {
          chain,
          coreAddress,
        }).selectors,
        proposalModule,
      })),
    [chain, coreAddress, proposalModules]
  )

  // Cursor values for each proposal module for incremental queries.
  const [startBefores, setStartBefores] = useState<
    Record<string, Record<ProposalType, number | undefined> | undefined>
  >({})

  const vetoableProposalsLoading = useCachedLoadingWithError(
    daoVetoableProposalsSelector({
      coreAddress,
      chainId: chain.chain_id,
    })
  )
  const vetoableProposals =
    vetoableProposalsLoading.loading || vetoableProposalsLoading.errored
      ? []
      : vetoableProposalsLoading.data.flatMap(
          ({ dao, proposalModules, proposalsWithModule }) =>
            proposalsWithModule.flatMap(
              ({ proposalModule: { prefix }, proposals }) =>
                proposals.map(
                  ({ id }): StatefulProposalLineProps => ({
                    chainId: chain.chain_id,
                    coreAddress: dao,
                    proposalModules,
                    proposalId: `${prefix}${id}`,
                    proposalViewUrl: getDaoProposalPath(dao, `${prefix}${id}`),
                    isPreProposeProposal: false,
                  })
                )
            )
        )

  const [loading, setLoading] = useState(true)
  const [canLoadMore, setCanLoadMore] = useState(true)
  const loadMore = useRecoilCallback(
    ({ snapshot }) =>
      // If `refreshAll` is true, we will load all proposals from the start,
      // ignoring the startBefore cursor values, until we have loaded all the
      // already loaded proposals.
      async (refreshAll = false) => {
        setLoading(true)

        // If refreshing all, we need to reset the state so we start from the
        // beginning.
        let newOpenProposals = refreshAll ? [] : openProposals
        let newHistoryProposals = refreshAll ? [] : historyProposals
        let newStartBefores = refreshAll ? {} : startBefores

        // If refreshing all, save number of proposals loaded so we can load
        // proposals from the beginning until we load this number.
        const totalProposalsLoaded =
          openProposals.length + historyProposals.length
        const proposalIdsSeen = new Set<string>()

        try {
          do {
            // Load the most recent PROP_LOAD_LIMIT proposals from each module.
            const proposalListInfos = await Promise.all(
              commonSelectors.flatMap(async ({ proposalModule, selectors }) => {
                const startBefore = newStartBefores[proposalModule.address]

                const proposalInfos = await snapshot.getPromise(
                  selectors.reverseProposalInfos({
                    startBefore: startBefore?.normal,
                    limit: PROP_PAGINATE_LIMIT,
                  })
                )

                const preProposePendingProposalInfos =
                  selectors.reversePreProposePendingProposalInfos
                    ? await snapshot.getPromise(
                        selectors.reversePreProposePendingProposalInfos({
                          startBefore: startBefore?.preProposePending,
                          limit: PROP_PAGINATE_LIMIT,
                        })
                      )
                    : undefined

                const preProposeCompletedProposalInfos =
                  selectors.reversePreProposeCompletedProposalInfos
                    ? await snapshot.getPromise(
                        selectors.reversePreProposeCompletedProposalInfos({
                          startBefore: startBefore?.preProposeCompleted,
                          limit: PROP_PAGINATE_LIMIT,
                        })
                      )
                    : undefined

                return [
                  ...proposalInfos.map(
                    (info): CommonProposalListInfoWithType => ({
                      type: ProposalType.Normal,
                      ...info,
                    })
                  ),
                  ...(preProposePendingProposalInfos?.map(
                    (info): CommonProposalListInfoWithType => ({
                      type: ProposalType.PreProposePending,
                      ...info,
                    })
                  ) ?? []),
                  ...(preProposeCompletedProposalInfos?.map(
                    (info): CommonProposalListInfoWithType => ({
                      type: ProposalType.PreProposeCompleted,
                      ...info,
                    })
                  ) ?? []),
                ].map((info) => ({
                  ...info,
                  proposalModule,
                }))
              })
            )

            // Sort descending by timestamp, putting undefined timestamps at the
            // bottom.
            let newProposalInfos = proposalListInfos
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
              // We loaded the most recent PROP_LOAD_LIMIT proposals from each
              // module above, and then sorted all of them against each other.
              // Thus, we can only guarantee that the first PROP_LOAD_LIMIT
              // proposals in this list of proposals combined from all proposal
              // modules are in order. If we display all proposals returned
              // (e.g. 10 from A, 10 from B, etc.), it's possible we'll include
              // proposals from module B that are temporally after
              // not-yet-loaded proposals from module A. In other words, if A
              // has 12 proposals, B has 5 proposals, all of A's proposals are
              // more recent than B's, and we load the first 10 from both, we
              // cannot show the first 10 from A followed by all 5 from B,
              // because we do not yet know if A has another page of 10 that are
              // before B's 5. Thus, we ask all modules for 10, and only show
              // the most recent 10, until the next list loads the remaining 2
              // from A followed by the 5 from B (since A is out of proposals).
              // In summary, we must display at most the number of proposals
              // that we ask for from each module to preserve the relative
              // timestamps across all modules.
              .slice(0, PROP_PAGINATE_LIMIT)

            // Store startBefore cursor values for next query based on last
            // proposal ID in list from each proposal module.
            newStartBefores = proposalModules.reduce((acc, proposalModule) => {
              const thisModulesProposalInfos = newProposalInfos.filter(
                (info) => info.proposalModule === proposalModule
              )

              return {
                ...acc,
                [proposalModule.address]: PROPOSAL_TYPES.reduce(
                  (acc, type) => ({
                    ...acc,
                    [type]:
                      thisModulesProposalInfos
                        .filter((info) => info.type === type)
                        .slice(-1)[0]?.proposalNumber ??
                      // If no proposal from this proposal module with this type
                      // shows up in the proposals we are listing here, use the
                      // startBefore from before.
                      newStartBefores[proposalModule.address]?.[type],
                  }),
                  {} as Record<ProposalType, number | undefined>
                ),
              }
            }, {} as typeof newStartBefores)

            // If we loaded the max we asked for, there may be more in another
            // query.
            const canLoadMore = newProposalInfos.length === PROP_PAGINATE_LIMIT
            setCanLoadMore(canLoadMore)

            // Remove proposals that should be hidden from the list after the
            // start befores are calculated above to preserve the pagination.
            newProposalInfos = newProposalInfos.filter(
              (info) => !info.hideFromList
            )

            const transformIntoProps = ({
              id,
              type,
            }: typeof newProposalInfos[number]): StatefulProposalLineProps => ({
              chainId: chain.chain_id,
              coreAddress,
              proposalModules,
              proposalId: id,
              proposalViewUrl: getDaoProposalPath(coreAddress, id),
              isPreProposeProposal:
                type === ProposalType.PreProposePending ||
                type === ProposalType.PreProposeCompleted,
            })

            newOpenProposals = [
              ...newOpenProposals,
              ...newProposalInfos
                .filter(({ isOpen }) => isOpen)
                .map(transformIntoProps),
            ]
            newHistoryProposals = [
              ...newHistoryProposals,
              ...newProposalInfos
                .filter(({ isOpen }) => !isOpen)
                .map(transformIntoProps),
            ]

            newProposalInfos.forEach((info) => {
              proposalIdsSeen.add(info.id)
            })

            // If no more to load, stop.
            if (!canLoadMore) {
              break
            }
          } while (
            // Load at least the minimum proposals.
            proposalIdsSeen.size < MIN_LOAD_PROPS ||
            // Keep looping if we are refreshing all proposals and we have not
            // yet loaded as many as we started with.
            (refreshAll && proposalIdsSeen.size < totalProposalsLoaded)
          )
        } finally {
          // Update state.
          setOpenProposals(newOpenProposals)
          setHistoryProposals(newHistoryProposals)
          setStartBefores(newStartBefores)

          setLoading(false)
        }
      },
    [
      openProposals,
      historyProposals,
      startBefores,
      commonSelectors,
      proposalModules,
      coreAddress,
      getDaoProposalPath,
    ]
  )
  // Load once on mount.
  useEffect(() => {
    loadMore()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Refresh all proposals on proposal WebSocket messages.
  const setRefreshProposalsId = useSetRecoilState(refreshProposalsIdAtom)
  useOnDaoWebSocketMessage('proposal', () => {
    setRefreshProposalsId((id) => id + 1)
    // Refresh all proposals.
    loadMore(true)
  })

  return (
    <StatelessProposalList
      DiscordNotifierConfigureModal={DiscordNotifierConfigureModal}
      ProposalLine={ProposalLine}
      canLoadMore={canLoadMore}
      createNewProposalHref={getDaoProposalPath(coreAddress, 'create')}
      historyProposals={historyProposals}
      isMember={isMember}
      loadMore={
        // Force no arguments.
        () => loadMore()
      }
      loadingMore={loading}
      openProposals={openProposals}
      vetoableProposals={vetoableProposals}
    />
  )
}
