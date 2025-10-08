import { queryOptions } from '@tanstack/react-query'

import {
  chainQueries,
  daoDaoCoreQueries,
  daoQueries,
  indexerQueries,
} from '@dao-dao/state/query'
import {
  DaoPageMode,
  Expiration,
  FeedSourceDaoWithItems,
  FeedSourceItem,
  IQueryClient,
  ProfileChain,
  SupportedChainIndexerMode,
} from '@dao-dao/types'
import { ProposalStatus } from '@dao-dao/types/protobuf/codegen/cosmos/gov/v1/gov'
import {
  FollowingDaosKvpkClient,
  getDaoProposalPath,
  isConfiguredChainName,
} from '@dao-dao/utils'

import { OpenProposalsProposalLineProps } from './types'

/**
 * Fetch open proposals as feed items.
 */
export const fetchFeedOpenProposals = async (
  queryClient: IQueryClient,
  {
    uuid,
    profileAddresses,
  }: {
    /**
     * The UUID to load from.
     */
    uuid: string
    /**
     * The profile's addresses on each chain.
     */
    profileAddresses: Pick<ProfileChain, 'chainId' | 'address'>[]
  }
): Promise<FeedSourceDaoWithItems<OpenProposalsProposalLineProps>[]> => {
  // Map profile chain ID to address.
  const profileChainAddressMap: Record<string, string | undefined> =
    Object.fromEntries(
      profileAddresses.map(({ chainId, address }) => [chainId, address])
    )

  const followingDaosKvpkClient = new FollowingDaosKvpkClient({
    queryClient,
  })

  const following = await followingDaosKvpkClient.listFollowingDaos({
    uuid,
  })

  if (following.length === 0) {
    return []
  }

  const followingDaosWithProposals = await Promise.all(
    following
      .filter((dao) => !isConfiguredChainName(dao.chainId, dao.coreAddress))
      .map(async (dao) => {
        const profileAddress = profileChainAddressMap[dao.chainId]
        return {
          dao,
          proposalModules: await queryClient.fetchQuery(
            daoQueries.proposalModules({
              chainId: dao.chainId,
              coreAddress: dao.coreAddress,
            })
          ),
          openProposals: await Promise.all(
            (
              await queryClient.fetchQuery(
                indexerQueries.queryContract<
                  | {
                      proposalModuleAddress: string
                      proposals: {
                        id: number
                        proposal: {
                          start_height: number
                          expiration: Expiration
                        }
                        voted?: boolean
                      }[]
                    }[]
                  | null
                >({
                  chainId: dao.chainId,
                  contractAddress: dao.coreAddress,
                  formula: 'daoCore/openProposals',
                  args: { address: profileAddress },
                  noFallback: true,
                  allowedModes: [
                    SupportedChainIndexerMode.Tx,
                    SupportedChainIndexerMode.All,
                  ],
                })
              )
            )?.map(async ({ proposalModuleAddress, proposals }) => ({
              proposalModuleAddress,
              proposals: await Promise.all(
                proposals.map(async (proposal) => ({
                  ...proposal,
                  votingPower: profileAddress
                    ? await queryClient.fetchQuery(
                        daoDaoCoreQueries.votingPowerAtHeight({
                          chainId: dao.chainId,
                          contractAddress: dao.coreAddress,
                          args: {
                            address: profileAddress,
                            height: proposal.proposal.start_height,
                          },
                        })
                      )
                    : undefined,
                }))
              ),
            })) ?? []
          ),
        }
      })
  )

  // Native chain governance DAOs.
  const followingChainGovDaosWithProposals = await Promise.all(
    following
      .filter((dao) => isConfiguredChainName(dao.chainId, dao.coreAddress))
      .map(async (dao) => {
        const profileAddress = profileChainAddressMap[dao.chainId]
        return {
          dao,
          proposals: await Promise.all(
            (
              await queryClient.fetchQuery(
                chainQueries.govProposals({
                  chainId: dao.chainId,
                  status: ProposalStatus.PROPOSAL_STATUS_VOTING_PERIOD,
                })
              )
            ).proposals.map(async (proposal) => ({
              proposal,
              votes: profileAddress
                ? await queryClient.fetchQuery(
                    chainQueries.govProposalVote({
                      chainId: dao.chainId,
                      proposalId: Number(proposal.id),
                      voter: profileAddress,
                    })
                  )
                : undefined,
            }))
          ),
        }
      })
  )

  return [
    // Add followed chain governance DAOs first.
    ...followingChainGovDaosWithProposals.map(
      ({
        dao,
        proposals,
      }): FeedSourceDaoWithItems<OpenProposalsProposalLineProps> => ({
        ...dao,
        items: proposals.map(
          ({
            proposal,
            votes,
          }): FeedSourceItem<OpenProposalsProposalLineProps> => ({
            props: {
              type: 'gov',
              props: {
                proposalId: proposal.id.toString(),
                proposal,
              },
            },
            pending: votes?.length === 0,
            order: (
              proposal.proposal.votingEndTime ||
              proposal.proposal.votingStartTime ||
              proposal.proposal.submitTime
            )?.getTime(),
          })
        ),
      })
    ),
    // Add DAO DAO DAOs.
    ...followingDaosWithProposals.map(
      ({
        dao,
        proposalModules,
        openProposals,
      }): FeedSourceDaoWithItems<OpenProposalsProposalLineProps> => ({
        ...dao,
        items: proposalModules.flatMap(
          (proposalModule) =>
            openProposals
              .find(
                ({ proposalModuleAddress }) =>
                  proposalModuleAddress === proposalModule.address
              )
              ?.proposals.map(
                ({
                  id,
                  proposal: { expiration },
                  voted,
                  votingPower,
                }): FeedSourceItem<OpenProposalsProposalLineProps> => ({
                  props: {
                    type: 'dao',
                    props: {
                      ...dao,
                      proposalId: `${proposalModule.prefix}${id}`,
                      proposalViewUrl: getDaoProposalPath(
                        DaoPageMode.Dapp,
                        dao.coreAddress,
                        `${proposalModule.prefix}${id}`
                      ),
                    },
                  },
                  pending:
                    // If successfully checked for vote and found nothing,
                    // and wallet had voting power, mark as pending. If
                    // failed to check vote or load voting power, don't
                    // mark as pending.
                    voted === false &&
                    !!votingPower &&
                    votingPower.power !== '0',
                  order:
                    'at_time' in expiration
                      ? Number(expiration.at_time)
                      : 'at_height' in expiration
                        ? Number(expiration.at_height)
                        : undefined,
                })
              ) ?? []
        ),
      })
    ),
  ]
}

export const feedOpenProposalsQueries = {
  /**
   * Fetch open proposals as feed items.
   */
  openProposals: (options: Parameters<typeof fetchFeedOpenProposals>[1]) =>
    queryOptions({
      queryKey: ['feed', 'openProposals', options],
      queryFn: (ctx) => fetchFeedOpenProposals(ctx.client, options),
    }),
}
