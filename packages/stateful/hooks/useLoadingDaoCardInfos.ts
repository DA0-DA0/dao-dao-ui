import { useWallet } from '@noahsaso/cosmodal'
import { waitForAll } from 'recoil'

import { indexerFeaturedDaosSelector } from '@dao-dao/state/recoil'
import { useCachedLoadable, useCachedLoading } from '@dao-dao/stateless'
import { DaoCardInfo, LoadingData } from '@dao-dao/types'
import { MAINNET, SUPPORTED_CHAINS } from '@dao-dao/utils'

import { daoCardInfoSelector, followingDaosSelector } from '../recoil'

export const useLoadingDaoCardInfos = (
  daos: LoadingData<
    {
      chainId: string
      coreAddress: string
    }[]
  >
): LoadingData<DaoCardInfo[]> => {
  // If `coreAddresses` is undefined, we're still loading DAOs.
  const daoCardInfosLoadable = useCachedLoadable(
    !daos.loading
      ? waitForAll(
          daos.data.map(({ chainId, coreAddress }) =>
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
  const chains = SUPPORTED_CHAINS.filter(({ mainnet }) => mainnet === MAINNET)
  const featuredDaos = useCachedLoading(
    waitForAll(chains.map(({ id }) => indexerFeaturedDaosSelector(id))),
    []
  )

  return useLoadingDaoCardInfos(
    featuredDaos.loading
      ? { loading: true }
      : {
          loading: false,
          data: chains.flatMap(({ id }, index) =>
            featuredDaos.data[index].map((coreAddress) => ({
              chainId: id,
              coreAddress,
            }))
          ),
        }
  )
}

export const useLoadingFollowingDaoCardInfos = (): LoadingData<
  DaoCardInfo[]
> => {
  const chains = SUPPORTED_CHAINS.filter(({ mainnet }) => mainnet === MAINNET)

  const { publicKey } = useWallet()
  const followingDaosLoading = useCachedLoading(
    publicKey
      ? waitForAll(
          chains.map(({ id }) =>
            followingDaosSelector({
              chainId: id,
              walletPublicKey: publicKey.hex,
            })
          )
        )
      : undefined,
    []
  )

  return useLoadingDaoCardInfos(
    followingDaosLoading.loading
      ? { loading: true }
      : {
          loading: false,
          data: chains.flatMap(({ id }, index) =>
            followingDaosLoading.data[index].map((coreAddress) => ({
              chainId: id,
              coreAddress,
            }))
          ),
        }
  )
}
