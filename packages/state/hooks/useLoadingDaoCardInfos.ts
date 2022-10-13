import { useEffect, useState } from 'react'

import { DaoCardInfo, LoadingData } from '@dao-dao/tstypes'
import { getFallbackImage } from '@dao-dao/utils'

import { usePinnedDaos } from '.'
import { GetDaosApiName, useGetDaos } from '../subquery/daos/info'
import { getFeaturedDaoAddresses } from '../utils'

export const useLoadingDaoCardInfos = (
  coreAddresses: string[],
  apiName?: GetDaosApiName
): LoadingData<DaoCardInfo[]> => {
  const daosQuery = useGetDaos({ coreAddresses }, apiName)
  const daoQueryInfos =
    (daosQuery.data || daosQuery.previousData)?.daos.nodes ?? []

  return daosQuery.loading
    ? { loading: true }
    : {
        loading: false,
        data: daoQueryInfos.map(
          ({ created, imageUrl, parentDao, ...info }): DaoCardInfo => ({
            ...info,
            established: created ? new Date(created) : undefined,
            imageUrl: imageUrl || getFallbackImage(info.coreAddress),
            parentDao: parentDao
              ? {
                  ...parentDao,
                  imageUrl:
                    parentDao.imageUrl ||
                    getFallbackImage(parentDao.coreAddress),
                }
              : undefined,
            tokenSymbol: 'USDC',
            lazyData: { loading: true },
          })
        ),
      }
}

export const useLoadingFeaturedDaoCardInfos = (): LoadingData<
  DaoCardInfo[]
> => {
  const [featuredAddresses, setFeaturedAddresses] = useState([] as string[])
  useEffect(() => {
    getFeaturedDaoAddresses().then(setFeaturedAddresses).catch(console.error)
  }, [])

  return useLoadingDaoCardInfos(
    featuredAddresses,
    // Featured DAOs only exist on mainnet, so use mainnet indexer.
    'daos'
  )
}

export const useLoadingPinnedDaoCardInfos = (): LoadingData<DaoCardInfo[]> => {
  const { pinnedAddresses } = usePinnedDaos()

  return useLoadingDaoCardInfos(pinnedAddresses)
}
