import { selectorFamily, waitForAll } from 'recoil'

import {
  DaoCoreV2Selectors,
  blockHeightSelector,
  blocksPerYearSelector,
  openProposalsSelector,
} from '@dao-dao/state/recoil'
import {
  DaoPageMode,
  FeedSourceDaoWithItems,
  FeedSourceItem,
  StatefulProposalLineProps,
  WithChainId,
} from '@dao-dao/types'
import { convertExpirationToDate, getDaoProposalPath } from '@dao-dao/utils'

import { followingDaosWithProposalModulesSelector } from '../../../recoil'

export const feedOpenProposalsSelector = selectorFamily<
  FeedSourceDaoWithItems[],
  WithChainId<{ address: string; hexPublicKey: string }>
>({
  key: 'feedOpenProposals',
  get:
    ({ address, hexPublicKey, chainId }) =>
    ({ get }) => {
      const blocksPerYear = get(
        blocksPerYearSelector({
          chainId,
        })
      )
      const currentBlockHeight = get(
        blockHeightSelector({
          chainId,
        })
      )

      // Need proposal modules for the proposal line props.
      const followingDaosWithProposalModules = get(
        followingDaosWithProposalModulesSelector({
          walletPublicKey: hexPublicKey,
          chainId,
        })
      )

      const openProposalsPerDao = get(
        waitForAll(
          followingDaosWithProposalModules.map(({ coreAddress }) =>
            openProposalsSelector({
              coreAddress,
              address,
              chainId,
            })
          )
        )
      )

      const daosWithVotingPowerAtHeightsSelectors =
        followingDaosWithProposalModules.flatMap(({ coreAddress }, index) =>
          openProposalsPerDao[index].flatMap(({ proposals }) =>
            proposals.map(({ proposal: { start_height } }) => ({
              coreAddress,
              height: start_height,
              selector: DaoCoreV2Selectors.votingPowerAtHeightSelector({
                contractAddress: coreAddress,
                chainId,
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
        ): FeedSourceDaoWithItems<StatefulProposalLineProps> => {
          const proposalModulesWithOpenProposals = openProposalsPerDao[index]

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
                    }): FeedSourceItem<StatefulProposalLineProps> => ({
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
