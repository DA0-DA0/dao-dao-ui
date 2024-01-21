import { constSelector, waitForAll } from 'recoil'

import { indexerFeaturedDaosSelector } from '@dao-dao/state/recoil'
import { useCachedLoadable, useCachedLoading } from '@dao-dao/stateless'
import { DaoCardInfo, LoadingData } from '@dao-dao/types'
import { NUM_FEATURED_DAOS, getSupportedChains } from '@dao-dao/utils'

import { daoCardInfoSelector, followingDaosSelector } from '../recoil'
import { useSupportedChainWallets } from './useSupportedChainWallets'

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

export const useLoadingFeaturedDaoCardInfos = (
  // If passed, will only load DAOs from this chain. Otherwise, will load
  // from all chains.
  chainId?: string
): LoadingData<DaoCardInfo[]> => {
  const chains = getSupportedChains().filter(
    ({ chain: { chain_id } }) => !chainId || chain_id === chainId
  )
  const featuredDaos = useCachedLoading(
    waitForAll(
      chains.map(({ chain }) => indexerFeaturedDaosSelector(chain.chain_id))
    ),
    chains.map(() => [])
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

export const useLoadingFollowingDaoCardInfos = (
  // If passed, will only load DAOs from this chain. Otherwise, will load
  // from all chains.
  chainId?: string
): LoadingData<DaoCardInfo[]> => {
  const supportedChainWallets = useSupportedChainWallets().filter(
    ({ chainWallet: { chain } }) => !chainId || chain.chain_id === chainId
  )

  const followingDaosLoading = useCachedLoading(
    supportedChainWallets.some(({ hexPublicKey }) => hexPublicKey)
      ? waitForAll(
          supportedChainWallets.map(
            ({ chainWallet: { chain }, hexPublicKey }) =>
              hexPublicKey
                ? followingDaosSelector({
                    chainId: chain.chain_id,
                    walletPublicKey: hexPublicKey,
                  })
                : constSelector([])
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
          data: supportedChainWallets.flatMap(
            ({ chainWallet: { chain } }, index) =>
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
