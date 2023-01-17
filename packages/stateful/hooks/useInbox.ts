import { WalletConnectionStatus, useWallet } from '@noahsaso/cosmodal'
import { useCallback, useEffect, useMemo } from 'react'
import { useSetRecoilState } from 'recoil'

import {
  blockHeightSelector,
  blocksPerYearSelector,
  refreshOpenProposalsAtom,
} from '@dao-dao/state'
import { useCachedLoadable } from '@dao-dao/stateless'
import {
  InboxDao,
  InboxDaoWithItems,
  InboxItem,
  InboxState,
} from '@dao-dao/types'
import { CHAIN_ID, convertExpirationToDate } from '@dao-dao/utils'

import { ProposalLine, ProposalLineProps } from '../components/ProposalLine'
import {
  followingDaoDropdownInfosSelector,
  followingDaosWithOpenProposalsSelector,
} from '../recoil'

export const useInbox = (): InboxState => {
  const { address: walletAddress, status: walletConnectionStatus } = useWallet()

  const setRefreshOpenProposals = useSetRecoilState(refreshOpenProposalsAtom)

  // Refresh all input sources.
  const refresh = useCallback(() => {
    setRefreshOpenProposals((id) => id + 1)
  }, [setRefreshOpenProposals])

  // Automatically update once per minute.
  useEffect(() => {
    const interval = setInterval(refresh, 60 * 1000)
    return () => clearInterval(interval)
  }, [refresh])

  const followingDaoDropdownInfosLoadable = useCachedLoadable(
    followingDaoDropdownInfosSelector
  )
  const followingDaoDropdownInfos =
    followingDaoDropdownInfosLoadable.state === 'hasValue'
      ? followingDaoDropdownInfosLoadable.contents
      : undefined

  const followingDaosWithOpenProposalsLoadable = useCachedLoadable(
    // Don't load without a wallet until we're no longer initializing. This
    // prevents duplicate queries when the page is first loading.
    walletConnectionStatus === WalletConnectionStatus.Initializing ||
      walletConnectionStatus === WalletConnectionStatus.AttemptingAutoConnection
      ? undefined
      : followingDaosWithOpenProposalsSelector({
          walletAddress,
        })
  )
  const followingDaosWithOpenProposals =
    followingDaosWithOpenProposalsLoadable.state === 'hasValue'
      ? followingDaosWithOpenProposalsLoadable.contents
      : undefined

  const blocksPerYearLoadable = useCachedLoadable(blocksPerYearSelector({}))
  const blocksPerYear =
    blocksPerYearLoadable.state === 'hasValue'
      ? blocksPerYearLoadable.contents
      : undefined
  const currentBlockHeightLoadable = useCachedLoadable(blockHeightSelector({}))
  const currentBlockHeight =
    currentBlockHeightLoadable.state === 'hasValue'
      ? currentBlockHeightLoadable.contents
      : undefined

  const { itemCount, daosWithItems } = useMemo(() => {
    if (!followingDaosWithOpenProposals || !followingDaoDropdownInfos) {
      return {
        itemCount: 0,
        daosWithItems: [],
      }
    }

    const daosWithItems = followingDaosWithOpenProposals
      .map(
        ({
          coreAddress,
          proposalModules,
          openProposals,
        }): InboxDaoWithItems | undefined => {
          const daoDropdownInfo = followingDaoDropdownInfos.find(
            (dao) => dao.coreAddress === coreAddress
          )
          if (!daoDropdownInfo || !openProposals) {
            return undefined
          }

          return {
            dao: daoDropdownInfo,
            items: [
              // Proposals.
              ...openProposals.map(
                ({
                  proposalModule: { prefix },
                  proposalNumber,
                  expiration,
                }): InboxItem<ProposalLineProps> => ({
                  Renderer: ProposalLine,
                  props: {
                    chainId: CHAIN_ID,
                    coreAddress,
                    proposalId: `${prefix}${proposalNumber}`,
                    proposalModules,
                    proposalViewUrl: `/dao/${coreAddress}/proposals/${prefix}${proposalNumber}`,
                  },
                  order:
                    (blocksPerYear &&
                      currentBlockHeight &&
                      convertExpirationToDate(
                        blocksPerYear,
                        expiration,
                        currentBlockHeight
                      )?.getTime()) ||
                    undefined,
                })
              ),
            ],
          }
        }
      )
      .filter(Boolean) as InboxDaoWithItems[]

    // Flatten items so we can sort them with respect to each other.
    const itemsWithDao = daosWithItems
      .flatMap(({ dao, items }) =>
        items.map((item) => ({
          item,
          dao,
        }))
      )
      .sort((a, b) => (a.item.order ?? Infinity) - (b.item.order ?? Infinity))

    // Order DAOs by the order that one of their items first appears in list of
    // all items.
    const orderedDaos = itemsWithDao.reduce(
      (acc, { dao }) => (acc.includes(dao) ? acc : [...acc, dao]),
      [] as InboxDao[]
    )

    // For each DAO, override the items with the sorted items.
    const sortedDaosWithItems: InboxDaoWithItems[] = orderedDaos.map((dao) => ({
      dao,
      items: itemsWithDao
        .filter((itemWithDao) => itemWithDao.dao === dao)
        .map(({ item }) => item),
    }))

    return {
      itemCount: itemsWithDao.length,
      daosWithItems: sortedDaosWithItems,
    }
  }, [
    blocksPerYear,
    currentBlockHeight,
    followingDaoDropdownInfos,
    followingDaosWithOpenProposals,
  ])

  return {
    loading:
      blocksPerYearLoadable.state === 'loading' ||
      currentBlockHeightLoadable.state === 'loading' ||
      followingDaoDropdownInfosLoadable.state === 'loading' ||
      followingDaosWithOpenProposalsLoadable.state === 'loading',
    refreshing:
      (blocksPerYearLoadable.state === 'hasValue' &&
        blocksPerYearLoadable.updating) ||
      (currentBlockHeightLoadable.state === 'hasValue' &&
        currentBlockHeightLoadable.updating) ||
      (followingDaoDropdownInfosLoadable.state === 'hasValue' &&
        followingDaoDropdownInfosLoadable.updating) ||
      (followingDaosWithOpenProposalsLoadable.state === 'hasValue' &&
        followingDaosWithOpenProposalsLoadable.updating),
    daosWithItems,
    itemCount,
    refresh,
  }
}
