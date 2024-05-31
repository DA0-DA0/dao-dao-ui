import { constSelector, useRecoilValueLoadable, waitForAll } from 'recoil'

import {
  followingDaosSelector,
  indexerFeaturedDaosSelector,
} from '@dao-dao/state/recoil'
import { useCachedLoadable } from '@dao-dao/stateless'
import {
  DaoInfo,
  DaoSource,
  LoadingData,
  StatefulDaoCardProps,
} from '@dao-dao/types'
import { getSupportedChains } from '@dao-dao/utils'

import { daoInfoSelector } from '../recoil'
import { useProfile } from './useProfile'

export const useLoadingDaos = (
  daos: LoadingData<DaoSource[]>,
  alphabetize = false
): LoadingData<DaoInfo[]> => {
  const daoInfosLoadable = useCachedLoadable(
    !daos.loading
      ? waitForAll(
          daos.data.map(({ chainId, coreAddress }) =>
            daoInfoSelector({
              chainId,
              coreAddress,
            })
          )
        )
      : undefined
  )

  return daoInfosLoadable.state !== 'hasValue'
    ? { loading: true }
    : {
        loading: false,
        updating: daoInfosLoadable.updating,
        data: (daoInfosLoadable.contents.filter(Boolean) as DaoInfo[]).sort(
          (a, b) => (alphabetize ? a.name.localeCompare(b.name) : 0)
        ),
      }
}

export const useLoadingFeaturedDaoCards = (
  // If passed, will only load DAOs from this chain. Otherwise, will load
  // from all chains.
  chainId?: string
): LoadingData<StatefulDaoCardProps[]> => {
  const chains = getSupportedChains().filter(
    ({ chain: { chain_id } }) => !chainId || chain_id === chainId
  )
  const featuredDaos = useRecoilValueLoadable(
    waitForAll(
      chains.map(({ chain }) => indexerFeaturedDaosSelector(chain.chain_id))
    )
  )

  const daos = useLoadingDaos(
    featuredDaos.state === 'loading'
      ? { loading: true }
      : featuredDaos.state === 'hasError'
      ? { loading: false, data: [] }
      : {
          loading: false,
          data: chains
            .flatMap(
              ({ chain }, index) =>
                featuredDaos.contents[index]?.map(
                  ({ address: coreAddress, order }) => ({
                    chainId: chain.chain_id,
                    coreAddress,
                    order,
                  })
                ) || []
            )
            .sort((a, b) => a.order - b.order),
        }
  )
  return daos.loading
    ? daos
    : {
        loading: false,
        updating: daos.updating,
        data: daos.data.map(
          (info): StatefulDaoCardProps => ({
            info,
          })
        ),
      }
}

export const useLoadingFollowingDaos = (
  // If passed, will only load DAOs from this chain. Otherwise, will load from
  // all chains.
  chainId?: string
): LoadingData<DaoInfo[]> => {
  const { uniquePublicKeys } = useProfile()

  const followingDaosLoading = useRecoilValueLoadable(
    !uniquePublicKeys.loading
      ? waitForAll(
          uniquePublicKeys.data.map(({ publicKey }) =>
            followingDaosSelector({
              walletPublicKey: publicKey,
            })
          )
        )
      : constSelector([])
  )

  return useLoadingDaos(
    followingDaosLoading.state === 'loading'
      ? { loading: true }
      : followingDaosLoading.state === 'hasError'
      ? { loading: false, data: [] }
      : {
          loading: false,
          data: followingDaosLoading.contents.flatMap((following) =>
            following.filter((f) => !chainId || f.chainId === chainId)
          ),
        },
    // Alphabetize.
    true
  )
}
