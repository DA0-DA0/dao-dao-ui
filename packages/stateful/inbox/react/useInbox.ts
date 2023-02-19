import { useEffect, useMemo, useRef } from 'react'
import { waitForAll } from 'recoil'

import { configSelector } from '@dao-dao/state/recoil/selectors/contracts/DaoCore.v2'
import { useCachedLoadable } from '@dao-dao/stateless'
import { InboxDaoWithItems, InboxState } from '@dao-dao/types'
import { getFallbackImage } from '@dao-dao/utils'

import { getSources } from '../core'

export const useInbox = (): InboxState => {
  const sources = getSources().map(({ Renderer, useData }) => ({
    Renderer,
    // Safe to disable since `getSources` is constant. The hooks are always
    // called in the same order.
    // eslint-disable-next-line react-hooks/rules-of-hooks
    data: useData(),
  }))

  // Refresh all input sources.
  const refresh = () => sources.map(({ data: { refresh } }) => refresh())

  // Update all sources once per minute. Memoize refresh function so that it
  // doesn't restart the interval when the ref changes.
  const refreshRef = useRef(refresh)
  refreshRef.current = refresh
  useEffect(() => {
    const interval = setInterval(() => refreshRef.current(), 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  // Sort and combine items from all sources.
  const { itemCount, sourceDaosWithItems } = useMemo(() => {
    // Flatten items so we can sort them with respect to each other. This also
    // serves to filter out any DAOs with no items.
    const itemsWithDao = sources
      .flatMap(({ Renderer, data: { daosWithItems } }) =>
        daosWithItems.flatMap(({ coreAddress, items }) =>
          items.map((item) => ({
            Renderer,
            coreAddress,
            item,
          }))
        )
      )
      .sort((a, b) => (a.item.order ?? Infinity) - (b.item.order ?? Infinity))

    // Order DAOs by the order that one of their items first appears in list of
    // all items.
    const orderedDaos = itemsWithDao.reduce(
      (acc, { coreAddress }) =>
        acc.includes(coreAddress) ? acc : [...acc, coreAddress],
      [] as string[]
    )

    // For each DAO, select from the sorted items (preserving order) only the
    // items that belong to that DAO. This also serves to combine/group items
    // from the various sources by DAO.
    const sortedCombinedDaosWithItems = orderedDaos.map((coreAddress) => {
      return {
        coreAddress,
        items: itemsWithDao
          .filter((itemWithDao) => itemWithDao.coreAddress === coreAddress)
          .map(({ Renderer, item }) => ({
            Renderer,
            ...item,
          })),
      }
    })

    return {
      itemCount: itemsWithDao.length,
      sourceDaosWithItems: sortedCombinedDaosWithItems,
    }
  }, [sources])

  // Get DAO configs for all DAOs found.
  const daoConfigs = useCachedLoadable(
    waitForAll(
      sourceDaosWithItems.map(({ coreAddress }) =>
        configSelector({
          contractAddress: coreAddress,
          params: [],
        })
      )
    )
  )

  // Combine DAO configs with DAOs and items.
  const daosWithItems = useMemo(() => {
    if (daoConfigs.state !== 'hasValue') {
      return []
    }

    return sourceDaosWithItems
      .map(
        ({ coreAddress, items }, index): InboxDaoWithItems | undefined =>
          daoConfigs.contents[index] && {
            dao: {
              coreAddress,
              name: daoConfigs.contents[index].name,
              imageUrl:
                daoConfigs.contents[index].image_url ||
                getFallbackImage(coreAddress),
            },
            items,
          }
      )
      .filter(
        (daoWithItems): daoWithItems is InboxDaoWithItems => !!daoWithItems
      )
  }, [daoConfigs.state, daoConfigs.contents, sourceDaosWithItems])

  return {
    loading: sources.some(({ data: { loading } }) => loading),
    refreshing: sources.some(({ data: { refreshing } }) => refreshing),
    daosWithItems,
    itemCount,
    refresh,
  }
}
