import { waitForAll } from 'recoil'

import { indexerFeaturedDaosSelector } from '@dao-dao/state/recoil'
import { useCachedLoadable, useCachedLoading } from '@dao-dao/stateless'
import { DaoCardInfo, LoadingData } from '@dao-dao/types'
import { CHAIN_ID } from '@dao-dao/utils'

import { daoCardInfoSelector } from '../recoil'
import { useFollowingDaos } from './useFollowingDaos'

export const useLoadingDaoCardInfos = (
  chainId: string,
  coreAddresses?: string[]
): LoadingData<DaoCardInfo[]> => {
  // If `coreAddresses` is undefined, we're still loading DAOs.
  const daoCardInfosLoadable = useCachedLoadable(
    coreAddresses
      ? waitForAll(
          coreAddresses.map((coreAddress) =>
            daoCardInfoSelector({
              chainId,
              coreAddress,
            })
          )
        )
      : undefined
  )

  return daoCardInfosLoadable.state !== 'hasValue'
    ? { loading: true }
    : {
        loading: false,
        updating: daoCardInfosLoadable.updating,
        data: daoCardInfosLoadable.contents.filter(Boolean) as DaoCardInfo[],
      }
}

export const useLoadingFeaturedDaoCardInfos = (): LoadingData<
  DaoCardInfo[]
> => {
  const featuredDaos = useCachedLoading(indexerFeaturedDaosSelector, undefined)
  return useLoadingDaoCardInfos(
    CHAIN_ID,
    featuredDaos.loading ? undefined : featuredDaos.data
  )
}

export const useLoadingFollowingDaoCardInfos = (): LoadingData<
  DaoCardInfo[]
> => {
  const { daos } = useFollowingDaos()
  return useLoadingDaoCardInfos(
    CHAIN_ID,
    daos.loading ? undefined : daos.data.following
  )
}
