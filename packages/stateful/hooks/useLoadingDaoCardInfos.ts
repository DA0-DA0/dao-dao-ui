import { waitForAll } from 'recoil'

import { indexerFeaturedDaosSelector } from '@dao-dao/state/recoil'
import { useCachedLoadable, useCachedLoading } from '@dao-dao/stateless'
import { DaoCardInfo, LoadingData } from '@dao-dao/types'
import { NUM_FEATURED_DAOS, getSupportedChains } from '@dao-dao/utils'

import { daoCardInfoSelector, followingDaosSelector } from '../recoil'
import { useWallet } from './useWallet'

export const useLoadingDaoCardInfos = (
  daos: LoadingData<
    {
      chainId: string
      coreAddress: string
    }[]
  >,
  alphabetize = false
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
        data: (
          daoCardInfosLoadable.contents.filter(Boolean) as DaoCardInfo[]
        ).sort((a, b) => (alphabetize ? a.name.localeCompare(b.name) : 0)),
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
          data: chains
            .flatMap(({ chain }, index) =>
              featuredDaos.data[index].map(({ address: coreAddress, tvl }) => ({
                chainId: chain.chain_id,
                coreAddress,
                tvl,
              }))
            )
            .sort((a, b) => b.tvl - a.tvl)
            .slice(0, NUM_FEATURED_DAOS),
        }
  )
}

export const useLoadingFollowingDaoCardInfos = (): LoadingData<
  DaoCardInfo[]
> => {
  const chains = getSupportedChains()

  const { hexPublicKey } = useWallet()
  const followingDaosLoading = useCachedLoading(
    !hexPublicKey.loading
      ? waitForAll(
          chains.map(({ chain }) =>
            followingDaosSelector({
              chainId: chain.chain_id,
              walletPublicKey: hexPublicKey.data,
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
        },
    // Alphabetize.
    true
  )
}
