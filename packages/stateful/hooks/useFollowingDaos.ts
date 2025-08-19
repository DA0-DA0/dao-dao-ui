import { useCallback, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

import { useUpdatingRef } from '@dao-dao/stateless'
import { DaoSource, LoadingDataWithError } from '@dao-dao/types'
import { processError, serializeDaoSource } from '@dao-dao/utils'

import { useQueryLoadingDataWithError } from './query'
import { useManageProfile } from './useManageProfile'
import { useFollowingDaosKvpkClient } from './usePfpkClient'
import { useProfile } from './useProfile'

export type UseFollowingDaosReturn = {
  following: LoadingDataWithError<DaoSource[]>
  isFollowing: (dao: DaoSource) => boolean
  setFollowing: (dao: DaoSource) => Promise<boolean>
  setUnfollowing: (dao: DaoSource) => Promise<boolean>
  updatingFollowing: boolean
}

export const useFollowingDaos = (): UseFollowingDaosReturn => {
  const { t } = useTranslation()

  const { connected, connecting } = useProfile()
  const { profile, addChains } = useManageProfile()

  const { client: followingDaosKvpkClient } = useFollowingDaosKvpkClient()

  const following = useQueryLoadingDataWithError(
    profile.loading
      ? undefined
      : followingDaosKvpkClient.listFollowingDaosQuery({
          uuid: profile.data.uuid,
        })
  )

  const isFollowing = useMemo(() => {
    // Construct set of following DAOs so we can check existence quickly.
    const followingDaosSet = new Set(
      following.loading || following.errored
        ? []
        : following.data.flat().map(serializeDaoSource)
    )

    return (dao: DaoSource) => followingDaosSet.has(serializeDaoSource(dao))
  }, [following])

  const [updating, setUpdating] = useState(false)

  // Turn this into a reference so we can use it in `setFollowing` without
  // memoizing.
  const addChainsRef = useUpdatingRef(addChains)

  const setFollowing = useCallback(
    async (dao: DaoSource) => {
      const addChains = addChainsRef.current

      if (!connected || profile.loading || !addChains.ready) {
        toast.error(t('error.logInToFollow'))
        return false
      }
      if (updating || addChains.status !== 'idle') {
        return false
      }

      setUpdating(true)
      try {
        // If DAO's chain not added to profile, add it so that we know to load
        // followed DAOs from the public key on this chain later. Otherwise, if
        // profile does not yet exist, it will be created with the public key
        // automatically by the `followDao` call below, so no need to
        // redundantly call `addChains`.
        if (profile.data.uuid && !profile.data.chains[dao.chainId]) {
          await addChains.go([dao.chainId])
        }

        await followingDaosKvpkClient.followDao(dao)

        return true
      } catch (err) {
        console.error(err)
        toast.error(processError(err))

        return false
      } finally {
        setUpdating(false)
      }
    },
    [addChainsRef, connected, followingDaosKvpkClient, profile, t, updating]
  )

  const setUnfollowing = useCallback(
    async (dao: DaoSource) => {
      if (!connected) {
        toast.error(t('error.logInToFollow'))
        return false
      }
      if (updating) {
        return false
      }

      setUpdating(true)

      try {
        await followingDaosKvpkClient.unfollowDao(dao)

        return true
      } catch (err) {
        console.error(err)
        toast.error(processError(err))

        return false
      } finally {
        setUpdating(false)
      }
    },
    [connected, followingDaosKvpkClient, t, updating]
  )

  return {
    following,
    isFollowing,
    setFollowing,
    setUnfollowing,
    updatingFollowing:
      // If wallet connecting, following is not yet loaded.
      connecting ||
      // Updating if wallet connected and following is loading or update is in
      // progress.
      (connected && (following.loading || updating)),
  }
}
