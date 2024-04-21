import {
  constSelector,
  selectorFamily,
  waitForAll,
  waitForAllSettled,
} from 'recoil'

import {
  DaoCoreV2Selectors,
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
  WithChainId,
} from '@dao-dao/types'
import { ProposalStatus } from '@dao-dao/types/protobuf/codegen/cosmos/gov/v1/gov'
import {
  convertExpirationToDate,
  getDaoProposalPath,
  isConfiguredChainName,
} from '@dao-dao/utils'

import { followingDaosWithProposalModulesSelector } from '../../../recoil'
import { OpenProposalsProposalLineProps } from './types'

export const feedOpenProposalsSelector = selectorFamily<
  FeedSourceDaoWithItems<OpenProposalsProposalLineProps>[],
  WithChainId<{ address: string; hexPublicKey: string }>
>({
  key: 'feedOpenProposals',
  get:
    ({ address, hexPublicKey, chainId }) =>
    ({ get }) => {
      const [
        blocksPerYear,
        currentBlockHeight,
        followingDaosWithProposalModules,
      ] = get(
        waitForAll([
          blocksPerYearSelector({
            chainId,
          }),
          blockHeightSelector({
            chainId,
          }),
          // Need proposal modules for the proposal line props if a DAO.
          followingDaosWithProposalModulesSelector({
            chainId,
            walletPublicKey: hexPublicKey,
          }),
        ])
      )

      // If any of the following DAOs are the x/gov module, fetch open proposals
      // and associated votes.
      const openGovProposals = followingDaosWithProposalModules.some(
        ({ coreAddress }) => isConfiguredChainName(chainId, coreAddress)
      )
        ? get(
            govProposalsSelector({
              chainId,
              status: ProposalStatus.PROPOSAL_STATUS_VOTING_PERIOD,
            })
          )
        : undefined
      const openGovProposalVotes = get(
        waitForAllSettled(
          openGovProposals?.proposals.map(({ id }) =>
            govProposalVoteSelector({
              chainId,
              proposalId: Number(id),
              voter: address,
            })
          ) ?? []
        )
      )

      const openProposalsPerDao = get(
        waitForAll(
          followingDaosWithProposalModules.map(({ coreAddress }) =>
            isConfiguredChainName(chainId, coreAddress)
              ? constSelector([])
              : openProposalsSelector({
                  chainId,
                  coreAddress,
                  address,
                })
          )
        )
      )

      const daosWithVotingPowerAtHeightsSelectors =
        followingDaosWithProposalModules.flatMap(({ coreAddress }, index) =>
          isConfiguredChainName(chainId, coreAddress)
            ? []
            : openProposalsPerDao[index].flatMap(({ proposals }) =>
                proposals.map(({ proposal: { start_height } }) => ({
                  coreAddress,
                  height: start_height,
                  selector: DaoCoreV2Selectors.votingPowerAtHeightSelector({
                    chainId,
                    contractAddress: coreAddress,
                    params: [
                      {
                        address,
                        height: start_height,
                      },
                    ],
                  }),
                }))
              )
        )
      const votingPowerValues = get(
        waitForAll(
          daosWithVotingPowerAtHeightsSelectors.map(({ selector }) => selector)
        )
      )
      // Map DAO and height to whether or not the wallet has voting power.
      const hasVotingPowerForDaoAtHeight =
        daosWithVotingPowerAtHeightsSelectors.reduce(
          (acc, { coreAddress, height }, index) => ({
            ...acc,
            [`${coreAddress}:${height}`]:
              votingPowerValues[index].power !== '0',
          }),
          {} as Record<string, boolean | undefined>
        )

      // Match up open proposals per DAO with their proposal modules.
      return followingDaosWithProposalModules.map(
        (
          { coreAddress, proposalModules },
          index
        ): FeedSourceDaoWithItems<OpenProposalsProposalLineProps> => {
          const proposalModulesWithOpenProposals = openProposalsPerDao[index]

          return {
            chainId,
            coreAddress,
            items:
              isConfiguredChainName(chainId, coreAddress) && openGovProposals
                ? openGovProposals.proposals.map(
                    (
                      proposal,
                      index
                    ): FeedSourceItem<OpenProposalsProposalLineProps> => ({
                      props: {
                        type: 'gov',
                        props: {
                          proposalId: proposal.id.toString(),
                          proposal,
                        },
                      },
                      pending:
                        openGovProposalVotes[index].state === 'hasValue' &&
                        openGovProposalVotes[index].valueOrThrow().length === 0,
                      order: (
                        proposal.proposal.votingEndTime ||
                        proposal.proposal.votingStartTime ||
                        proposal.proposal.submitTime
                      )?.getTime(),
                    })
                  )
                : proposalModules.flatMap(
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
                                proposalModules,
                                proposalViewUrl: getDaoProposalPath(
                                  DaoPageMode.Dapp,
                                  coreAddress,
                                  `${proposalModule.prefix}${id}`
                                ),
                                isPreProposeProposal: false,
                              },
                            },
                            pending:
                              !voted &&
                              !!hasVotingPowerForDaoAtHeight[
                                `${coreAddress}:${start_height}`
                              ],
                            order: convertExpirationToDate(
                              blocksPerYear,
                              expiration,
                              currentBlockHeight
                            )?.getTime(),
                          })
                        ) ?? []
                  ),
          }
        }
      )
    },
})
