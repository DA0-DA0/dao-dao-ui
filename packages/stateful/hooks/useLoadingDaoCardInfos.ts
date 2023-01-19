import { ChainInfoID } from '@noahsaso/cosmodal'
import { useEffect } from 'react'
import { useSetRecoilState, waitForAll } from 'recoil'

import featuredDaos from '@dao-dao/state/featured_daos.json'
import { featuredDaoDumpStatesAtom } from '@dao-dao/state/recoil'
import { useCachedLoadable } from '@dao-dao/stateless'
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
        data: daoCardInfosLoadable.contents.filter(Boolean) as DaoCardInfo[],
      }
}

export const useLoadingFeaturedDaoCardInfos = (): LoadingData<
  DaoCardInfo[]
> => {
  const data = useLoadingDaoCardInfos(
    featuredDaos.map(({ coreAddress }) => coreAddress),
    // Featured DAOs only exist on mainnet.
    ChainInfoID.Juno1
  )

  // Once featured DAOs load once, clear cache from page static props so the DAO
  // cards update.
  const setFeaturedDaoDumpStates = useSetRecoilState(featuredDaoDumpStatesAtom)
  useEffect(() => {
    if (!data.loading) {
      setFeaturedDaoDumpStates(null)
    }
  }, [setFeaturedDaoDumpStates, data.loading])

  return data
}

export const useLoadingFollowingDaoCardInfos = (): LoadingData<
  DaoCardInfo[]
> => {
  const { daos } = useFollowingDaos()
  return useLoadingDaoCardInfos(daos.loading ? undefined : daos.data.following)
}
