import { WalletConnectionStatus, useWallet } from '@noahsaso/cosmodal'
import uniq from 'lodash.uniq'
import { useCallback, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useSetRecoilState } from 'recoil'

import { refreshFollowingDaosAtom } from '@dao-dao/state'
import { useCachedLoading, useChain } from '@dao-dao/stateless'
import { LoadingData } from '@dao-dao/types'
import {
  FOLLOWING_DAOS_PREFIX,
  KVPK_API_BASE,
  processError,
} from '@dao-dao/utils'

import {
  followingDaosSelector,
  temporaryFollowingDaosAtom,
} from '../recoil/selectors/dao/following'
import { useCfWorkerAuthPostRequest } from './useCfWorkerAuthPostRequest'

export type UseFollowingDaosReturn = {
  daos: LoadingData<string[]>
  refreshFollowing: () => void
  isFollowing: (coreAddress: string) => any
  setFollowing: (coreAddressOrAddresses: string | string[]) => Promise<boolean>
  setUnfollowing: (
    coreAddressOrAddresses: string | string[]
  ) => Promise<boolean>
  updatingFollowing: boolean
  ready: boolean
}

export const useFollowingDaos = (): UseFollowingDaosReturn => {
  const { t } = useTranslation()
  const { chain_id: chainId } = useChain()
  const { status, connected, publicKey } = useWallet()

  // Following API doesn't update right away, so this serves to keep track of
  // all successful updates for the current session. This will be reset on page
  // refresh.
  const setTemporary = useSetRecoilState(
    temporaryFollowingDaosAtom(publicKey?.hex ?? '')
  )

  const followingDaosLoading = useCachedLoading(
    publicKey
      ? followingDaosSelector({
          chainId,
          walletPublicKey: publicKey.hex,
        })
      : undefined,
    []
  )

  const setRefreshFollowingDaos = useSetRecoilState(refreshFollowingDaosAtom)
  const refreshFollowing = useCallback(
    () => setRefreshFollowingDaos((id) => id + 1),
    [setRefreshFollowingDaos]
  )

  const isFollowing = useCallback(
    (coreAddress: string) =>
      !followingDaosLoading.loading &&
      followingDaosLoading.data.includes(coreAddress),
    [followingDaosLoading]
  )

  const [updating, setUpdating] = useState(false)
  const { ready, postRequest } = useCfWorkerAuthPostRequest(
    KVPK_API_BASE,
    'Update Following'
  )

  const setFollowing = useCallback(
    async (coreAddressOrAddresses: string | string[]) => {
      if (!ready) {
        toast.error(t('error.logInToFollow'))
        return false
      }
      if (updating) {
        return false
      }

      setUpdating(true)

      try {
        const daos = [coreAddressOrAddresses].flat()
        await postRequest('/setMany', {
          data: daos.map((coreAddress) => ({
            key: FOLLOWING_DAOS_PREFIX + `${chainId}:${coreAddress}`,
            value: 1,
          })),
        })

        setTemporary((prev) => ({
          following: uniq([...prev.following, ...daos]),
          unfollowing: prev.unfollowing.filter(
            (address) => !daos.includes(address)
          ),
        }))
        refreshFollowing()

        return true
      } catch (err) {
        console.error(err)
        toast.error(processError(err))

        return false
      } finally {
        setUpdating(false)
      }
    },
    [chainId, postRequest, ready, refreshFollowing, setTemporary, t, updating]
  )

  const setUnfollowing = useCallback(
    async (coreAddressOrAddresses: string | string[]) => {
      if (!ready) {
        toast.error(t('error.logInToFollow'))
        return false
      }
      if (updating) {
        return false
      }

      setUpdating(true)

      try {
        const daos = [coreAddressOrAddresses].flat()
        await postRequest('/setMany', {
          data: daos.map((coreAddress) => ({
            key: FOLLOWING_DAOS_PREFIX + `${chainId}:${coreAddress}`,
            value: null,
          })),
        })

        setTemporary((prev) => ({
          following: prev.following.filter(
            (address) => !daos.includes(address)
          ),
          unfollowing: uniq([...prev.unfollowing, ...daos]),
        }))
        refreshFollowing()

        return true
      } catch (err) {
        console.error(err)
        toast.error(processError(err))

        return false
      } finally {
        setUpdating(false)
      }
    },
    [chainId, postRequest, ready, refreshFollowing, setTemporary, t, updating]
  )

  return {
    daos: followingDaosLoading,
    refreshFollowing,
    isFollowing,
    setFollowing,
    setUnfollowing,
    updatingFollowing:
      // If wallet connecting, following is not yet loaded.
      status === WalletConnectionStatus.Initializing ||
      status === WalletConnectionStatus.AttemptingAutoConnection ||
      status === WalletConnectionStatus.Connecting ||
      // Updating if wallet connected and following is loading or update is in
      // progress.
      (connected && (followingDaosLoading.loading || updating)),
    ready,
  }
}
