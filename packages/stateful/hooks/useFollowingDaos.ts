import { WalletConnectionStatus, useWallet } from '@noahsaso/cosmodal'
import { useCallback, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useSetRecoilState } from 'recoil'

import { refreshFollowingDaosAtom } from '@dao-dao/state'
import { useCachedLoadable } from '@dao-dao/stateless'
import { LoadingData } from '@dao-dao/types'
import {
  CHAIN_ID,
  FOLLOWING_DAOS_API_BASE,
  loadableToLoadingData,
  processError,
} from '@dao-dao/utils'

import {
  followingDaosSelector,
  temporaryFollowingDaosAtom,
} from '../recoil/selectors/dao/following'
import { useCfWorkerAuthPostRequest } from './useCfWorkerAuthPostRequest'

export type UseFollowingDaosReturn = {
  daos: LoadingData<{
    following: string[]
    pending: string[]
  }>
  refreshFollowing: () => void
  isFollowing: (coreAddress: string) => any
  setFollowing: (coreAddress: string) => Promise<void>
  setUnfollowing: (coreAddress: string) => Promise<void>
  updatingFollowing: boolean
}

export const useFollowingDaos = (): UseFollowingDaosReturn => {
  const { t } = useTranslation()
  const { status } = useWallet()

  // Following API doesn't update right away, so this serves to keep track of
  // all successful updates for the current session. This will be reset on page
  // refresh.
  const setTemporary = useSetRecoilState(temporaryFollowingDaosAtom)
  const followingDaosLoadable = loadableToLoadingData(
    useCachedLoadable(followingDaosSelector({})),
    { following: [], pending: [] }
  )

  const setRefreshFollowingDaos = useSetRecoilState(refreshFollowingDaosAtom)
  const refreshFollowing = useCallback(
    () => setRefreshFollowingDaos((id) => id + 1),
    [setRefreshFollowingDaos]
  )

  const isFollowing = useCallback(
    (coreAddress: string) =>
      !followingDaosLoadable.loading &&
      followingDaosLoadable.data.following.includes(coreAddress),
    [followingDaosLoadable]
  )

  const [updating, setUpdating] = useState(false)
  const { ready, postRequest } = useCfWorkerAuthPostRequest(
    FOLLOWING_DAOS_API_BASE,
    'Update Following'
  )

  const setFollowing = useCallback(
    async (coreAddress: string) => {
      if (!ready) {
        toast.error(t('error.connectWalletToFollow'))
        return
      }
      if (updating) {
        return
      }

      setUpdating(true)

      try {
        await postRequest(`/follow/${CHAIN_ID}/${coreAddress}`)

        setTemporary((prev) => ({
          following: [...prev.following, coreAddress],
          unfollowing: prev.unfollowing.filter(
            (address) => address !== coreAddress
          ),
        }))
        refreshFollowing()
      } catch (err) {
        console.error(err)
        toast.error(processError(err))
      } finally {
        setUpdating(false)
      }
    },
    [postRequest, ready, refreshFollowing, setTemporary, t, updating]
  )

  const setUnfollowing = useCallback(
    async (coreAddress: string) => {
      if (!ready) {
        toast.error(t('error.connectWalletToFollow'))
        return
      }
      if (updating) {
        return
      }

      setUpdating(true)

      try {
        await postRequest(`/unfollow/${CHAIN_ID}/${coreAddress}`)

        setTemporary((prev) => ({
          following: prev.following.filter(
            (address) => address !== coreAddress
          ),
          unfollowing: [...prev.unfollowing, coreAddress],
        }))
        refreshFollowing()
      } catch (err) {
        console.error(err)
        toast.error(processError(err))
      } finally {
        setUpdating(false)
      }
    },
    [postRequest, ready, refreshFollowing, setTemporary, t, updating]
  )

  return {
    daos: followingDaosLoadable,
    refreshFollowing,
    isFollowing,
    setFollowing,
    setUnfollowing,
    updatingFollowing:
      // If wallet connecting, following is not yet loaded.
      status === WalletConnectionStatus.Initializing ||
      status === WalletConnectionStatus.AttemptingAutoConnection ||
      status === WalletConnectionStatus.Connecting ||
      // Updating if following is loading or update is in progress.
      followingDaosLoadable.loading ||
      updating ||
      // If wallet is connected but following has not yet been loaded, following
      // cannot yet be loaded. Wallet address atom is probably about to be set
      // in `WalletProvider`.
      (status === WalletConnectionStatus.Connected &&
        !!followingDaosLoadable.data.pendingAddress),
  }
}
