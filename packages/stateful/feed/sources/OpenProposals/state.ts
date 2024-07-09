import uniq from 'lodash.uniq'
import {
  constSelector,
  selectorFamily,
  waitForAll,
  waitForAny,
  waitForNone,
} from 'recoil'

import {
  DaoDaoCoreSelectors,
  blockHeightSelector,
  blocksPerYearSelector,
  govProposalVoteSelector,
  govProposalsSelector,
  openProposalsSelector,
} from '@dao-dao/state/recoil'
import {
  DaoPageMode,
  FeedSourceDaoWithItems,
  FeedSourceItem,
  ProfileChain,
} from '@dao-dao/types'
import { ProposalStatus } from '@dao-dao/types/protobuf/codegen/cosmos/gov/v1/gov'
import {
  convertExpirationToDate,
  getDaoProposalPath,
  isConfiguredChainName,
  serializeDaoSource,
} from '@dao-dao/utils'

import { followingDaosWithProposalModulesSelector } from '../../../recoil'
import { OpenProposalsProposalLineProps } from './types'

export const feedOpenProposalsSelector = selectorFamily<
  FeedSourceDaoWithItems<OpenProposalsProposalLineProps>[],
  {
    /**
     * The hex public keys to load from.
     */
    publicKeys: string[]
    /**
     * The profile's addresses on each chain.
     */
    profileAddresses: Pick<ProfileChain, 'chainId' | 'address'>[]
  }
>({
  key: 'feedOpenProposals',
  get:
    ({ publicKeys, profileAddresses }) =>
    ({ get }) => {
      // Map profile chain ID to address.
      const profileChainAddressMap: Record<string, string | undefined> =
        Object.fromEntries(
          profileAddresses.map(({ chainId, address }) => [chainId, address])
        )

      // Need proposal modules for the proposal line props.
      const followingDaosWithProposalModules = get(
        waitForAny(
          publicKeys.map((walletPublicKey) =>
            followingDaosWithProposalModulesSelector({
              walletPublicKey,
            })
          )
        )
      ).flatMap((l) => l.valueMaybe() || [])

      // Native chain governance DAOs.

      const followedChainGovWithOpenProposalsSelector =
        followingDaosWithProposalModules.flatMap(({ chainId, coreAddress }) =>
          isConfiguredChainName(chainId, coreAddress)
            ? {
                chainId,
                coreAddress,
                profileAddress: profileChainAddressMap[chainId],
                selector: govProposalsSelector({
                  chainId,
                  status: ProposalStatus.PROPOSAL_STATUS_VOTING_PERIOD,
                }),
              }
            : []
        )
      const openGovProposals =
        followedChainGovWithOpenProposalsSelector.length > 0
          ? get(
              waitForAny(
                followedChainGovWithOpenProposalsSelector.map(
                  ({ selector }) => selector
                )
              )
            )
          : []
      const openGovProposalVotes = get(
        waitForNone(
          followedChainGovWithOpenProposalsSelector.map(
            ({ chainId, profileAddress }, index) =>
              waitForNone(
                openGovProposals[index].valueMaybe()?.proposals.map(({ id }) =>
                  profileAddress
                    ? govProposalVoteSelector({
                        chainId,
                        proposalId: Number(id),
                        voter: profileAddress,
                      })
                    : constSelector([])
                ) || []
              )
          )
        )
      )

      // DAO DAO DAOs.

      const followedDaosWithOpenProposalsSelector =
        followingDaosWithProposalModules.flatMap(
          ({ chainId, coreAddress, proposalModules }) =>
            !isConfiguredChainName(chainId, coreAddress)
              ? {
                  chainId,
                  coreAddress,
                  proposalModules,
                  selector: openProposalsSelector({
                    chainId,
                    coreAddress,
                    address: profileChainAddressMap[chainId],
                  }),
                }
              : []
        )
      const openDaoProposals = get(
        waitForAll(
          followedDaosWithOpenProposalsSelector.map(({ selector }) => selector)
        )
      )
      // Get DAO voting power at each open proposal height.
      const daosWithVotingPowerAtHeightsSelectors =
        followedDaosWithOpenProposalsSelector.flatMap(
          ({ chainId, coreAddress }, index) =>
            openDaoProposals[index].flatMap(({ proposals }) =>
              proposals.map(({ proposal: { start_height } }) => {
                const address = profileChainAddressMap[chainId]
                return {
                  chainId,
                  coreAddress,
                  height: start_height,
                  selector: address
                    ? DaoDaoCoreSelectors.votingPowerAtHeightSelector({
                        chainId,
                        contractAddress: coreAddress,
                        params: [
                          {
                            address,
                            height: start_height,
                          },
                        ],
                      })
                    : undefined,
                }
              })
            ) || []
        )
      const votingPowerValues = get(
        waitForNone(
          daosWithVotingPowerAtHeightsSelectors.map(
            ({ selector }) => selector || constSelector(undefined)
          )
        )
      )
      // Map DAO and height to whether or not the wallet has voting power. If
      // undefined, could not load voting power.
      const hasVotingPowerForDaoAtHeight =
        daosWithVotingPowerAtHeightsSelectors.reduce(
          (acc, { chainId, coreAddress, height }, index) => {
            const votingPower = votingPowerValues[index].valueMaybe()

            return {
              ...acc,
              [`${serializeDaoSource({
                chainId,
                coreAddress,
              })}:${height}`]: votingPower && votingPower.power !== '0',
            }
          },
          {} as Record<string, boolean | undefined>
        )

      // Map chain ID to blocks per year and block height since we may need them
      // in the proposal line props.
      const uniqueChainIds = uniq(
        followedDaosWithOpenProposalsSelector.map(({ chainId }) => chainId)
      )
      const chainInfoMap: Record<
        string,
        | {
            blocksPerYear: number
            blockHeight: number
          }
        | undefined
      > = Object.fromEntries(
        get(
          waitForNone(
            uniqueChainIds.map((chainId) =>
              waitForAll([
                blocksPerYearSelector({
                  chainId,
                }),
                blockHeightSelector({
                  chainId,
                }),
              ])
            )
          )
        ).flatMap((loadable, index) =>
          loadable.state === 'hasValue'
            ? [
                [
                  uniqueChainIds[index],
                  {
                    blocksPerYear: loadable.contents[0],
                    blockHeight: loadable.contents[1],
                  },
                ],
              ]
            : []
        )
      )

      return [
        // Add followed chain governance DAOs.
        ...followedChainGovWithOpenProposalsSelector.map(
          (
            { chainId, coreAddress },
            index
          ): FeedSourceDaoWithItems<OpenProposalsProposalLineProps> => {
            const proposals =
              openGovProposals[index].valueMaybe()?.proposals || []
            const proposalVotes = openGovProposalVotes[index].valueMaybe() || []

            const items = proposals.flatMap(
              (
                proposal,
                index
              ): FeedSourceItem<OpenProposalsProposalLineProps> | [] => {
                const votes = proposalVotes[index]?.valueMaybe()

                return {
                  props: {
                    type: 'gov',
                    props: {
                      proposalId: proposal.id.toString(),
                      proposal,
                    },
                  },
                  // If successfully loaded votes and there are none, mark as
                  // pending. If failed to load, don't mark as pending.
                  pending: !!votes && votes.length === 0,
                  order: (
                    proposal.proposal.votingEndTime ||
                    proposal.proposal.votingStartTime ||
                    proposal.proposal.submitTime
                  )?.getTime(),
                }
              }
            )

            return {
              chainId,
              coreAddress,
              items,
            }
          }
        ),
        // Add DAO DAO DAOs by matching up a DAO.
        ...followedDaosWithOpenProposalsSelector.flatMap(
          (
            { chainId, coreAddress, proposalModules },
            index
          ): FeedSourceDaoWithItems<OpenProposalsProposalLineProps> | [] => {
            const proposalModulesWithOpenProposals = openDaoProposals[index]
            const chainInfo = chainInfoMap[chainId]

            return {
              chainId,
              coreAddress,
              items: proposalModules.flatMap(
                (proposalModule) =>
                  proposalModulesWithOpenProposals
                    .find(
                      ({ proposalModuleAddress }) =>
                        proposalModuleAddress === proposalModule.address
                    )
                    ?.proposals.map(
                      ({
                        id,
                        proposal: { expiration, start_height },
                        voted,
                      }): FeedSourceItem<OpenProposalsProposalLineProps> => ({
                        props: {
                          type: 'dao',
                          props: {
                            chainId,
                            coreAddress,
                            proposalId: `${proposalModule.prefix}${id}`,
                            proposalViewUrl: getDaoProposalPath(
                              DaoPageMode.Dapp,
                              coreAddress,
                              `${proposalModule.prefix}${id}`
                            ),
                            isPreProposeProposal: false,
                          },
                        },
                        pending:
                          // If successfully checked for vote and found nothing,
                          // and wallet had voting power, mark as pending. If
                          // failed to check vote or load voting power, don't
                          // mark as pending.
                          voted === false &&
                          !!hasVotingPowerForDaoAtHeight[
                            `${serializeDaoSource({
                              chainId,
                              coreAddress,
                            })}:${start_height}`
                          ],
                        order:
                          // `chainInfo` is only needed if expiration is in
                          // blocks.
                          chainInfo || !('at_height' in expiration)
                            ? convertExpirationToDate(
                                chainInfo?.blocksPerYear || 0,
                                expiration,
                                chainInfo?.blockHeight || 0
                              )?.getTime()
                            : undefined,
                      })
                    ) ?? []
              ),
            }
          }
        ),
      ]
    },
})
