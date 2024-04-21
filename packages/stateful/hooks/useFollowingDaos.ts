import uniq from 'lodash.uniq'
import { useCallback, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import { refreshFollowingDaosAtom, walletChainIdAtom } from '@dao-dao/state'
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
import { useProfile } from './useProfile'

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

  // Get the main connected wallet chain ID and use it to manage the profile,
  // since the user may be following a chain that the wallet has not connected
  // to before. This will likely happen when interacting with chain governance
  // on non-DAO DAO supported chains.
  const walletChainId = useRecoilValue(walletChainIdAtom)

  // Don't load chain-specific profile because the wallet may not be connected
  // to that chain and thus the correct profile won't load. Instead, fetch the
  // chains from the currently connected profile and find the correct one.
  const { connected, connecting, chains } = useProfile({
    chainId: walletChainId,
  })

  // Get current hex public key from profile's chains, falling back to the
  // profile's first chain if the current chain is not found.
  const currentHexPublicKey = chains.loading
    ? undefined
    : (chains.data.find((chain) => chain.chainId === chainId) || chains.data[0])
        ?.publicKey

  // Following API doesn't update right away, so this serves to keep track of
  // all successful updates for the current session. This will be reset on page
  // refresh.
  const setTemporary = useSetRecoilState(
    temporaryFollowingDaosAtom(currentHexPublicKey || '')
  )

  const followingDaosLoading = useCachedLoading(
    currentHexPublicKey
      ? followingDaosSelector({
          chainId,
          walletPublicKey: currentHexPublicKey,
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
    'Update Following',
    walletChainId
  )

  const { profile, addChains } = useManageProfile({
    chainId: walletChainId,
  })

  // Turn this into a reference so we can use it in `setFollowing` without
  // memoizing.
  const addChainsRef = useRef(addChains)
  addChainsRef.current = addChains

  const setFollowing = useCallback(
    async (coreAddressOrAddresses: string | string[]) => {
      const addChains = addChainsRef.current

      if (!ready || !addChains.ready || profile.loading) {
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
      connecting ||
      // Updating if wallet connected and following is loading or update is in
      // progress or hex public key not yet loaded.
      (connected &&
        (!currentHexPublicKey || followingDaosLoading.loading || updating)),
    ready,
  }
}
