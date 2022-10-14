import { ChainInfoID } from '@noahsaso/cosmodal'

import { DaoCardInfo, LoadingData } from '@dao-dao/tstypes'
import { CHAIN_ID, getFallbackImage } from '@dao-dao/utils'

import featuredDaos from '../featured_daos.json'
import { GetDaosApiName, useGetDaos } from '../subquery/daos/info'
import { usePinnedDaos } from './usePinnedDaos'

export interface UseLoadingDaoCardInfosOptions {
  apiName?: GetDaosApiName
  chainId?: string
}

export const useLoadingDaoCardInfos = (
  coreAddresses: string[],
  { apiName, chainId = CHAIN_ID }: UseLoadingDaoCardInfosOptions = {
    apiName: undefined,
    chainId: undefined,
  }
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
            chainId,
          })
        ),
      }
}

export const useLoadingFeaturedDaoCardInfos = (): LoadingData<DaoCardInfo[]> =>
  useLoadingDaoCardInfos(
    featuredDaos.map(({ coreAddress }) => coreAddress),
    // Featured DAOs only exist on mainnet, so use mainnet indexer and chain ID.
    {
      apiName: 'mainnetDaos',
      chainId: ChainInfoID.Juno1,
    }
  )

export const useLoadingPinnedDaoCardInfos = (): LoadingData<DaoCardInfo[]> => {
  const { pinnedAddresses } = usePinnedDaos()
  return useLoadingDaoCardInfos(pinnedAddresses)
}
