import { atom, selectorFamily, waitForAll } from 'recoil'

import {
  blockHeightSelector,
  blocksPerYearSelector,
  openProposalsSelector,
} from '@dao-dao/state/recoil'
import {
  InboxSourceDaoWithItems,
  InboxSourceItem,
  WithChainId,
} from '@dao-dao/types'
import { CHAIN_ID, convertExpirationToDate } from '@dao-dao/utils'

import { ProposalLineProps } from '../../../components/ProposalLine'
import { followingDaosWithProposalModulesSelector } from '../../../recoil'

export const refreshInboxOpenProposalsAtom = atom<number>({
  key: 'refreshInboxOpenProposals',
  default: 0,
})

export const inboxOpenProposalsSelector = selectorFamily<
  InboxSourceDaoWithItems[],
  WithChainId<{ walletAddress?: string }>
>({
  key: 'inboxOpenProposals',
  get:
    ({ walletAddress, chainId }) =>
    ({ get }) => {
      get(refreshInboxOpenProposalsAtom)

      const blocksPerYear = get(blocksPerYearSelector({}))
      const currentBlockHeight = get(blockHeightSelector({}))

      // Need proposal modules for the proposal line props.
      const followingDaosWithProposalModules = get(
        followingDaosWithProposalModulesSelector
      )

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
                    }): InboxSourceItem<ProposalLineProps> => ({
                      props: {
                        chainId: CHAIN_ID,
                        coreAddress,
                        proposalId: `${proposalModule.prefix}${id}`,
                        proposalModules,
                        proposalViewUrl: `/dao/${coreAddress}/proposals/${proposalModule.prefix}${id}`,
                      },
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
