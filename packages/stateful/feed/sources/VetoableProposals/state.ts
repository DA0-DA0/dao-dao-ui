import { selectorFamily, waitForAll } from 'recoil'

import { DaoCoreV2Selectors } from '@dao-dao/state'
import { VetoableProposalsProps } from '@dao-dao/stateless'
import {
  DaoPageMode,
  FeedSourceDaoWithItems,
  StatefulProposalLineProps,
  WithChainId,
} from '@dao-dao/types'

import { LinkWrapper, ProposalLine } from '../../../components'
import {
  daosWithDropdownVetoableProposalListSelector,
  followingDaosSelector,
} from '../../../recoil'

export const feedVetoableProposalsSelector = selectorFamily<
  FeedSourceDaoWithItems<VetoableProposalsProps<StatefulProposalLineProps>>[],
  WithChainId<{ hexPublicKey: string }>
>({
  key: 'feedVetoableProposals',
  get:
    ({ hexPublicKey, chainId }) =>
    ({ get }) => {
      const followingDaos = get(
        followingDaosSelector({
          walletPublicKey: hexPublicKey,
          chainId,
        })
      )
      const followingDaoConfigs = get(
        waitForAll(
          followingDaos.map((coreAddress) =>
            DaoCoreV2Selectors.configSelector({
              chainId,
              contractAddress: coreAddress,
              params: [],
            })
          )
        )
      )

      const daosWithVetoableProposalsPerDao = get(
        waitForAll(
          followingDaos.map((coreAddress) =>
            daosWithDropdownVetoableProposalListSelector({
              chainId,
              coreAddress,
              // Inbox only exists in the dApp.
              daoPageMode: DaoPageMode.Dapp,
            })
          )
        )
      )

      return daosWithVetoableProposalsPerDao.flatMap(
        (
          daosWithVetoableProposals,
          index
        ):
          | FeedSourceDaoWithItems<
              VetoableProposalsProps<StatefulProposalLineProps>
            >
          | [] =>
          daosWithVetoableProposals.length
            ? {
                chainId,
                coreAddress: followingDaos[index],
                // Just one vetoable proposals section, since the component
                // groups by DAOs automatically.
                items: [
                  {
                    pending: false,
                    props: {
                      daoName: followingDaoConfigs[index].name,
                      daosWithVetoableProposals,
                      ProposalLine,
                      LinkWrapper,
                      className: 'mt-4 ml-4 first:mt-0',
                    },
                  },
                ],
              }
            : []
      )
    },
})
