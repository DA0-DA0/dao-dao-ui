import { selectorFamily, waitForAny } from 'recoil'

import { DaoCoreV2Selectors } from '@dao-dao/state'
import { VetoableProposalsProps } from '@dao-dao/stateless'
import {
  DaoPageMode,
  FeedSourceDaoWithItems,
  StatefulProposalLineProps,
} from '@dao-dao/types'
import { isConfiguredChainName } from '@dao-dao/utils'

import { LinkWrapper, ProposalLine } from '../../../components'
import {
  daosWithDropdownVetoableProposalListSelector,
  followingDaosSelector,
} from '../../../recoil'

export const feedVetoableProposalsSelector = selectorFamily<
  FeedSourceDaoWithItems<VetoableProposalsProps<StatefulProposalLineProps>>[],
  {
    /**
     * The hex public keys to load from.
     */
    publicKeys: string[]
  }
>({
  key: 'feedVetoableProposals',
  get:
    ({ publicKeys }) =>
    ({ get }) => {
      const followingDaos = get(
        waitForAny(
          publicKeys.map((walletPublicKey) =>
            followingDaosSelector({
              walletPublicKey,
            })
          )
        )
      )
        .flatMap((l) => l.valueMaybe() || [])
        // A chain's x/gov module cannot have vetoable proposals.
        .filter(
          ({ chainId, coreAddress }) =>
            !isConfiguredChainName(chainId, coreAddress)
        )

      if (followingDaos.length === 0) {
        return []
      }

      const followingDaoConfigs = get(
        waitForAny(
          followingDaos.map(({ chainId, coreAddress }) =>
            DaoCoreV2Selectors.configSelector({
              chainId,
              contractAddress: coreAddress,
              params: [],
            })
          )
        )
      )

      const daosWithVetoableProposalsPerDao = get(
        waitForAny(
          followingDaos.map(({ chainId, coreAddress }) =>
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
          daosWithVetoableProposalsLoadable,
          index
        ):
          | FeedSourceDaoWithItems<
              VetoableProposalsProps<StatefulProposalLineProps>
            >
          | [] => {
          const daosWithVetoableProposals =
            daosWithVetoableProposalsLoadable.valueMaybe() || []
          const daoName = followingDaoConfigs[index].valueMaybe()?.name

          return daosWithVetoableProposals.length && daoName
            ? {
                ...followingDaos[index],
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
        }
      )
    },
})
