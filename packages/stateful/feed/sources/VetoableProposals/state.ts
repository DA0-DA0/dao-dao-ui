import { queryOptions } from '@tanstack/react-query'

import { daoDaoCoreQueries, daoQueries } from '@dao-dao/state'
import { VetoableProposalsProps } from '@dao-dao/stateless'
import {
  DaoPageMode,
  FeedSourceDaoWithItems,
  IQueryClient,
  StatefulProposalLineProps,
} from '@dao-dao/types'
import { FollowingDaosKvpkClient, isConfiguredChainName } from '@dao-dao/utils'

import { LinkWrapper, ProposalLine } from '../../../components'

/**
 * Fetch vetoable proposals as feed items.
 */
export const fetchFeedVetoableProposals = async (
  queryClient: IQueryClient,
  {
    uuid,
  }: {
    /**
     * The UUID to load from.
     */
    uuid: string
  }
): Promise<
  FeedSourceDaoWithItems<VetoableProposalsProps<StatefulProposalLineProps>>[]
> => {
  const followingDaosKvpkClient = new FollowingDaosKvpkClient({
    queryClient,
  })

  const following = (
    await followingDaosKvpkClient.listFollowingDaos({
      uuid,
    })
  )
    // A chain's x/gov module cannot have vetoable proposals.
    .filter(
      ({ chainId, coreAddress }) => !isConfiguredChainName(chainId, coreAddress)
    )

  if (following.length === 0) {
    return []
  }

  const followingDaoConfigsAndVetoableProposals = await Promise.all(
    following.map((dao) =>
      Promise.all([
        dao,
        queryClient.fetchQuery(
          daoDaoCoreQueries.config({
            chainId: dao.chainId,
            contractAddress: dao.coreAddress,
          })
        ),
        queryClient.fetchQuery(
          daoQueries.daosWithDropdownVetoableProposalList({
            chainId: dao.chainId,
            coreAddress: dao.coreAddress,
            // Inbox only exists in the dApp.
            daoPageMode: DaoPageMode.Dapp,
          })
        ),
      ])
    )
  )

  return followingDaoConfigsAndVetoableProposals.flatMap(
    ([dao, { name: daoName }, daosWithVetoableProposals]):
      | FeedSourceDaoWithItems<
          VetoableProposalsProps<StatefulProposalLineProps>
        >
      | [] =>
      daosWithVetoableProposals.length
        ? {
            ...dao,
            // Just one vetoable proposals section, since the component
            // groups by DAOs automatically.
            items: [
              {
                pending: false,
                props: {
                  daoName,
                  daosWithVetoableProposals,
                  ProposalLine,
                  LinkWrapper,
                },
              },
            ],
          }
        : []
  )
}

export const feedVetoableProposalsQueries = {
  /**
   * Fetch vetoable proposals as feed items.
   */
  vetoableProposals: (
    options: Parameters<typeof fetchFeedVetoableProposals>[1]
  ) =>
    queryOptions({
      queryKey: ['feed', 'vetoableProposals', options],
      queryFn: (ctx) => fetchFeedVetoableProposals(ctx.client, options),
    }),
}
