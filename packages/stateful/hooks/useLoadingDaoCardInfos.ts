import { useWallet } from '@noahsaso/cosmodal'
import { waitForAll } from 'recoil'

import { indexerFeaturedDaosSelector } from '@dao-dao/state/recoil'
import { useCachedLoadable, useCachedLoading } from '@dao-dao/stateless'
import { DaoCardInfo, LoadingData } from '@dao-dao/types'
import { getSupportedChains } from '@dao-dao/utils'

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
  const chains = getSupportedChains()
  const featuredDaos = useCachedLoading(
    waitForAll(
      chains.map(({ chain }) => indexerFeaturedDaosSelector(chain.chain_id))
    ),
    []
  )

  return useLoadingDaoCardInfos(
    featuredDaos.loading
      ? { loading: true }
      : {
          loading: false,
          data: chains.flatMap(({ chain }, index) =>
            featuredDaos.data[index].map((coreAddress) => ({
              chainId: chain.chain_id,
              coreAddress,
            }))
          ),
        }
  )
}

export const useLoadingFollowingDaoCardInfos = (): LoadingData<
  DaoCardInfo[]
> => {
  const chains = getSupportedChains()

  const { publicKey } = useWallet()
  const followingDaosLoading = useCachedLoading(
    publicKey
      ? waitForAll(
          chains.map(({ chain }) =>
            followingDaosSelector({
              chainId: chain.chain_id,
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
          data: chains.flatMap(({ chain }, index) =>
            followingDaosLoading.data[index].map((coreAddress) => ({
              chainId: chain.chain_id,
              coreAddress,
            }))
          ),
        }
  )
}
