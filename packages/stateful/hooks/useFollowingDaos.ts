import uniq from 'lodash.uniq'
import { useCallback, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useSetRecoilState } from 'recoil'

import { refreshFollowingDaosAtom } from '@dao-dao/state'
import { useCachedLoading } from '@dao-dao/stateless'
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
import { useManageProfile } from './useManageProfile'
import { useWallet } from './useWallet'

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

export const useFollowingDaos = (chainId: string): UseFollowingDaosReturn => {
  const { t } = useTranslation()
  const { isWalletConnected, isWalletConnecting, hexPublicKey } = useWallet({
    chainId,
    loadAccount: true,
  })

  // Following API doesn't update right away, so this serves to keep track of
  // all successful updates for the current session. This will be reset on page
  // refresh.
  const setTemporary = useSetRecoilState(
    temporaryFollowingDaosAtom(hexPublicKey.loading ? '' : hexPublicKey.data)
  )

  const followingDaosLoading = useCachedLoading(
    !hexPublicKey.loading
      ? followingDaosSelector({
          chainId,
          walletPublicKey: hexPublicKey.data,
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

  const { profile, addChains } = useManageProfile()

  // Turn this into a reference so we can use it in `setFollowing` without
  // memoizing.
  const addChainsRef = useRef(addChains)
  addChainsRef.current = addChains

  const setFollowing = useCallback(
    async (coreAddressOrAddresses: string | string[]) => {
      const addChains = addChainsRef.current

      if (!ready || !addChains.ready || profile.loading || profile.errored) {
        toast.error(t('error.logInToFollow'))
        return false
      }
      if (updating || addChains.status !== 'idle') {
        return false
      }

      setUpdating(true)

      try {
        // If chain not added to profile, add it so that we know to load
        // followed DAOs from the public key on this chain later.
        if (!profile.data.chains[chainId]) {
          await addChains.go([chainId])
        }

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
    [
      chainId,
      postRequest,
      profile,
      ready,
      refreshFollowing,
      setTemporary,
      t,
      updating,
    ]
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
      isWalletConnecting ||
      // Updating if wallet connected and following is loading or update is in
      // progress or hex public key not yet loaded.
      (isWalletConnected &&
        (!hexPublicKey || followingDaosLoading.loading || updating)),
    ready,
  }
}
