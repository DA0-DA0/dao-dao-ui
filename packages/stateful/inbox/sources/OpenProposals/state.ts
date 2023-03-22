import { selectorFamily, waitForAll } from 'recoil'

import {
  blockHeightSelector,
  blocksPerYearSelector,
  openProposalsSelector,
} from '@dao-dao/state/recoil'
import {
  DaoPageMode,
  InboxSourceDaoWithItems,
  InboxSourceItem,
  WithChainId,
} from '@dao-dao/types'
import {
  CHAIN_ID,
  convertExpirationToDate,
  getDaoProposalPath,
} from '@dao-dao/utils'

import { ProposalLineProps } from '../../../components/ProposalLine'
import { followingDaosWithProposalModulesSelector } from '../../../recoil'

export const inboxOpenProposalsSelector = selectorFamily<
  InboxSourceDaoWithItems[],
  WithChainId<{ walletAddress?: string }>
>({
  key: 'inboxOpenProposals',
  get:
    ({ walletAddress, chainId }) =>
    ({ get }) => {
      const blocksPerYear = get(blocksPerYearSelector({}))
      const currentBlockHeight = get(blockHeightSelector({}))

      // Need proposal modules for the proposal line props.
      const followingDaosWithProposalModules = walletAddress
        ? get(
            followingDaosWithProposalModulesSelector({
              walletAddress,
              chainId,
            })
          )
        : []

      const openProposalsPerDao = get(
        waitForAll(
          followingDaosWithProposalModules.map(({ coreAddress }) =>
            openProposalsSelector({
              coreAddress,
              address: walletAddress,
              chainId,
            })
          )
        )
      )

      // Match up open proposals per DAO with their proposal modules.
      return followingDaosWithProposalModules.map(
        (
          { coreAddress, proposalModules },
          index
        ): InboxSourceDaoWithItems<ProposalLineProps> => {
          const proposalModulesWithOpenProposals = openProposalsPerDao[index]

          return {
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
                      proposal: { expiration },
                      voted,
                    }): InboxSourceItem<ProposalLineProps> => ({
                      props: {
                        chainId: CHAIN_ID,
                        coreAddress,
                        proposalId: `${proposalModule.prefix}${id}`,
                        proposalModules,
                        proposalViewUrl: getDaoProposalPath(
                          DaoPageMode.Dapp,
                          coreAddress,
                          `${proposalModule.prefix}${id}`
                        ),
                      },
                      pending: !voted,
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
