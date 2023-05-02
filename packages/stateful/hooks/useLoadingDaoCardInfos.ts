import { ChainInfoID } from '@noahsaso/cosmodal'
import { waitForAll } from 'recoil'

import { indexerFeaturedMainnetDaosSelector } from '@dao-dao/state/recoil'
import { useCachedLoadable, useCachedLoading } from '@dao-dao/stateless'
import { DaoCardInfo, LoadingData } from '@dao-dao/types'

import { daoCardInfoSelector } from '../recoil'
import { useFollowingDaos } from './useFollowingDaos'

export const useLoadingDaoCardInfos = (
  coreAddresses?: string[],
  chainId?: string
): LoadingData<DaoCardInfo[]> => {
  // If `coreAddresses` is undefined, we're still loading DAOs.
  const daoCardInfosLoadable = useCachedLoadable(
    coreAddresses
      ? waitForAll(
          coreAddresses.map((coreAddress) =>
            daoCardInfoSelector({
              coreAddress,
              chainId,
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
  const featuredDaos = useCachedLoading(
    indexerFeaturedMainnetDaosSelector,
    undefined
  )
  return useLoadingDaoCardInfos(
    featuredDaos.loading ? undefined : featuredDaos.data,
    // Featured DAOs only exist on mainnet.
    ChainInfoID.Juno1
  )
}

export const useLoadingFollowingDaoCardInfos = (): LoadingData<
  DaoCardInfo[]
> => {
  const { daos } = useFollowingDaos()
  return useLoadingDaoCardInfos(daos.loading ? undefined : daos.data.following)
}
