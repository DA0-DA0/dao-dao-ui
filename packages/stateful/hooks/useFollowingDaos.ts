import uniq from 'lodash.uniq'
import { useCallback, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useSetRecoilState, waitForAll } from 'recoil'

import {
  followingDaosSelector,
  refreshFollowingDaosAtom,
  temporaryFollowingDaosAtom,
} from '@dao-dao/state'
import { useCachedLoadingWithError, useUpdatingRef } from '@dao-dao/stateless'
import { DaoSource } from '@dao-dao/types'
import {
  FOLLOWING_DAOS_PREFIX,
  KVPK_API_BASE,
  processError,
  serializeDaoSource,
} from '@dao-dao/utils'

import { useCfWorkerAuthPostRequest } from './useCfWorkerAuthPostRequest'
import { useManageProfile } from './useManageProfile'
import { useProfile } from './useProfile'

export type UseFollowingDaosReturn = {
  isFollowing: (dao: DaoSource) => boolean
  setFollowing: (dao: DaoSource) => Promise<boolean>
  setUnfollowing: (dao: DaoSource) => Promise<boolean>
  updatingFollowing: boolean
}

export const useFollowingDaos = (): UseFollowingDaosReturn => {
  const { t } = useTranslation()

  const { connected, connecting, uniquePublicKeys } = useProfile()
  const { profile, addChains } = useManageProfile()

  // Following API doesn't update right away, so this serves to keep track of
  // all successful updates for the current session. This will be reset on page
  // refresh.
  const setTemporary = useSetRecoilState(temporaryFollowingDaosAtom)

  const followingDaosLoading = useCachedLoadingWithError(
    uniquePublicKeys.loading
      ? undefined
      : waitForAll(
          uniquePublicKeys.data.map(({ publicKey }) =>
            followingDaosSelector({
              walletPublicKey: publicKey,
            })
          )
        ),
    (data) => data.flat()
  )

  const setRefreshFollowingDaos = useSetRecoilState(refreshFollowingDaosAtom)
  const refreshFollowing = useCallback(
    () => setRefreshFollowingDaos((id) => id + 1),
    [setRefreshFollowingDaos]
  )

  const isFollowing = useMemo(() => {
    // Construct set of following DAOs so we can check existence quickly.
    const followingDaosSet = new Set(
      followingDaosLoading.loading || followingDaosLoading.errored
        ? []
        : followingDaosLoading.data.map(serializeDaoSource)
    )

    return (dao: DaoSource) => followingDaosSet.has(serializeDaoSource(dao))
  }, [followingDaosLoading])

  const [updating, setUpdating] = useState(false)
  const { ready, postRequest } = useCfWorkerAuthPostRequest(
    KVPK_API_BASE,
    'Update Following'
  )

  // Turn this into a reference so we can use it in `setFollowing` without
  // memoizing.
  const addChainsRef = useUpdatingRef(addChains)

  const setFollowing = useCallback(
    async (dao: DaoSource) => {
      const addChains = addChainsRef.current

      if (!ready || profile.loading || !addChains.ready) {
        toast.error(t('error.logInToFollow'))
        return false
      }
      if (updating || addChains.status !== 'idle') {
        return false
      }

      setUpdating(true)
      try {
        // If DAO's chain not added to profile, add it so that we know to load
        // followed DAOs from the public key on this chain later.
        if (!profile.data.chains[dao.chainId]) {
          await addChains.go([dao.chainId])
        }

        const serializedDaoSource = serializeDaoSource(dao)

        await postRequest(
          '/set',
          {
            key: FOLLOWING_DAOS_PREFIX + serializedDaoSource,
            value: 1,
          },
          undefined,
          // Use DAO chain ID for following state to ensure we use the same
          // chain ID when following and unfollowing the DAO.
          dao.chainId
        )

        setTemporary((prev) => ({
          // Add to the tmp list of followed DAOs.
          following: uniq([...prev.following, serializedDaoSource]),
          // Remove from the tmp list of unfollowed DAOs.
          unfollowing: prev.unfollowing.filter(
            (unfollowed) => unfollowed !== serializedDaoSource
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
      addChainsRef,
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
    async (dao: DaoSource) => {
      if (!ready) {
        toast.error(t('error.logInToFollow'))
        return false
      }
      if (updating) {
        return false
      }

      setUpdating(true)

      try {
        const serializedDaoSource = serializeDaoSource(dao)

        await postRequest(
          '/set',
          {
            key: FOLLOWING_DAOS_PREFIX + serializedDaoSource,
            value: null,
          },
          undefined,
          // Use DAO chain ID for following state to ensure we use the same
          // chain ID when following and unfollowing the DAO.
          dao.chainId
        )

        setTemporary((prev) => ({
          // Remove from the tmp list of followed DAOs.
          following: prev.following.filter(
            (followed) => followed !== serializedDaoSource
          ),
          // Add to the tmp list of unfollowed DAOs.
          unfollowing: uniq([...prev.unfollowing, serializedDaoSource]),
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
    [postRequest, ready, refreshFollowing, setTemporary, t, updating]
  )

  return {
    isFollowing,
    setFollowing,
    setUnfollowing,
    updatingFollowing:
      // If wallet connecting, following is not yet loaded.
      connecting ||
      // Updating if wallet connected and following is loading or update is in
      // progress.
      (connected && (followingDaosLoading.loading || updating)),
  }
}
